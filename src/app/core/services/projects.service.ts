import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Projects } from 'src/app/models/projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  baseUrl = 'http://mogasoft.runasp.net/api'
  constructor(private http: HttpClient) { }
  getProjects(): Observable<Projects> {
    return this.http.get<Projects>(`${this.baseUrl}/Projects`);
  }
  getProjectById(id: number): Observable<Projects> {
    return this.http.get<Projects>(`${this.baseUrl}/Projects/${id}`);
  }
  getProjectsByCategory(category: any): Observable<Projects> {
    return this.http.get<Projects>(`${this.baseUrl}/Projects/ByCategory?Category=${category}`);
  }
  addProject(project: FormData): Observable<Projects> {
    return this.http.post<Projects>(`${this.baseUrl}/Projects`, project);
  }
  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/Projects/${id}`);
  }

}
