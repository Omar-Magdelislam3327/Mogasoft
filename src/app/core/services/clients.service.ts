import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clients } from 'src/app/models/client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }
  getClients(): Observable<Clients[]> {
    return this.http.get<Clients[]>(`${this.baseUrl}/Clients`);
  }
  getClientById(id: number): Observable<Clients> {
    return this.http.get<Clients>(`${this.baseUrl}/Clients/${id}`);
  }
  addClient(client: FormData): Observable<Clients> {
    return this.http.post<Clients>(`${this.baseUrl}/Clients`, client);
  }
  updateClient(id: number, client: FormData): Observable<Clients> {
    return this.http.put<Clients>(`${this.baseUrl}/Clients/${id}`, client);
  }
  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/Clients/${id}`);
  }
}
