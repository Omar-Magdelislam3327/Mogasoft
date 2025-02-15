import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Blogs } from 'src/app/models/blogs';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  baseUrl = 'http://mogasoft.runasp.net/api'
  constructor(private http: HttpClient) { }

  getBlogs(): Observable<Blogs> {
    return this.http.get<Blogs>(`${this.baseUrl}/Blogs/AllBlogs`);
  }
  getBlogById(id: number): Observable<Blogs> {
    return this.http.get<Blogs>(`${this.baseUrl}/Blogs/${id}`);
  }
  addBlog(blog: FormData): Observable<Blogs> {
    return this.http.post<Blogs>(`${this.baseUrl}/Blogs`, blog);
  }
  deleteBlog(id: number): Observable<Blogs> {
    return this.http.delete<Blogs>(`${this.baseUrl}/Blogs/${id}`);
  }
}
