import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plans } from 'src/app/models/plans';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlansService {
  baseUrl = environment.baseUrl;
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
