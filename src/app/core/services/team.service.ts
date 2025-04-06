import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { Team } from '../models/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }
  getTeam(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.baseUrl}/Teams/Members`);
  }
  addMember(member: FormData): Observable<Team> {
    return this.http.post<Team>(`${this.baseUrl}/Teams/Member`, member);
  }
  updateMember(id: number, member: FormData): Observable<Team> {
    return this.http.put<Team>(`${this.baseUrl}/Teams/Member/${id}`, member);
  }
  deleteMember(id: number): Observable<Team> {
    return this.http.delete<Team>(`${this.baseUrl}/Teams/Member/${id}`);
  }
}
