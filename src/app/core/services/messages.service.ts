import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { Messages } from '../models/messages';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }
  getMessages(): Observable<Messages> {
    return this.http.get<Messages>(`${this.baseUrl}/ContactUs`);
  }
  sendMessage(message: any): Observable<Messages> {
    return this.http.post<Messages>(`${this.baseUrl}/ContactUs`, message);
  }
  deleteMessage(id: number): Observable<Messages> {
    return this.http.delete<Messages>(`${this.baseUrl}/ContactUs/${id}`);
  }
}
