import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  baseUrl = 'https://mogasoft.runasp.net/api'
  constructor(private http: HttpClient) { }
  getServices() {
    return this.http.get<any>(`${this.baseUrl}/Services`);
  }
  getServiceByCategory(category: string) {
    return this.http.get<any>(`${this.baseUrl}/Services?Category=${category}`);
  }
  addService(service: any) {
    return this.http.post<any>(`${this.baseUrl}/Services`, service);
  }
  updateService(id: number, service: any) {
    return this.http.put<any>(`${this.baseUrl}/Services/${id}`, service);
  }
  deleteService(id: number) {
    return this.http.delete<any>(`${this.baseUrl}/Services/${id}`);
  }
}
