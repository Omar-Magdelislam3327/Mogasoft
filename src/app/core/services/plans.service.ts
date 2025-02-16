import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plans } from 'src/app/models/plans';

@Injectable({
  providedIn: 'root'
})
export class PlansService {
  baseUrl = 'http://mogasoft.runasp.net/api'
  constructor(private http: HttpClient) { }
  getPlans(): Observable<Plans> {
    return this.http.get<Plans>(`${this.baseUrl}/Hosting`);
  }
  addPlan(plan: FormData): Observable<Plans> {
    return this.http.post<Plans>(`${this.baseUrl}/Hosting`, plan);
  }
  deletePlan(id: number): Observable<Plans> {
    return this.http.delete<Plans>(`${this.baseUrl}/Hosting/${id}`);
  }
}
