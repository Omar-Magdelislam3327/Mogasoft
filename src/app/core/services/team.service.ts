import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from 'src/app/models/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  baseUrl = 'http://mogasoft.runasp.net/api'
  constructor(private http: HttpClient) { }
  getTeam(): Observable<Team> {
    return this.http.get<Team>(`${this.baseUrl}/Teams/Members`);
  }
  addMember(member: FormData): Observable<Team> {
    return this.http.post<Team>(`${this.baseUrl}/Teams/Member`, member);
  }
  deleteMember(id: number): Observable<Team> {
    return this.http.delete<Team>(`${this.baseUrl}/Teams/Member/${id}`);
  }
}
