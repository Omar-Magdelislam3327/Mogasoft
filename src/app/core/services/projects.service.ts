import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Projects } from 'src/app/models/projects';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  baseUrl = 'https://mogasoft.runasp.net/api';
  constructor(private http: HttpClient) { }
  getProjects(): Observable<Projects> {
    return this.http.get<Projects>(`${this.baseUrl}/Projects`);
  }
  getProjectById(id: number): Observable<Projects> {
    return this.http.get<Projects>(`${this.baseUrl}/Projects/${id}`);
  }
  getProjectBySlug(slug: string): Observable<Projects> {
    return this.http.get<Projects>(`${this.baseUrl}/Projects/BySlug/${slug}`);
  }
  getProjectsByCategory(category: any): Observable<Projects> {
    return this.http.get<Projects>(`${this.baseUrl}/Projects/ByCategory?Category=${category}`);
  }
  addProject(project: FormData): Observable<Projects> {
    return this.http.post<Projects>(`${this.baseUrl}/Projects`, project);
  }
  updateProject(id: number, project: FormData): Observable<Projects> {
    return this.http.put<Projects>(`${this.baseUrl}/Projects/${id}`, project);
  }
  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/Projects/${id}`);
  }

}
