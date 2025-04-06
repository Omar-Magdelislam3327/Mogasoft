import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  baseUrl = environment.baseUrl;
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
