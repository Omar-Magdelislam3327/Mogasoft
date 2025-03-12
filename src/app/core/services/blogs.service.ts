import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Blogs } from 'src/app/models/blogs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getBlogs(): Observable<Blogs> {
    return this.http.get<Blogs>(`${this.baseUrl}/Blogs/AllBlogs`);
  }
  getBlogById(id: number): Observable<Blogs> {
    return this.http.get<Blogs>(`${this.baseUrl}/Blogs/${id}`);
  }
  getBlogBySlug(slug: string): Observable<Blogs> {
    return this.http.get<Blogs>(`${this.baseUrl}/Blogs/BySlug/${slug}`);
  }
  addBlog(blog: FormData): Observable<Blogs> {
    return this.http.post<Blogs>(`${this.baseUrl}/Blogs`, blog);
  }
  updateBlog(id: number, blog: FormData): Observable<Blogs> {
    return this.http.put<Blogs>(`${this.baseUrl}/Blogs/${id}`, blog);
  }
  deleteBlog(id: number): Observable<Blogs> {
    return this.http.delete<Blogs>(`${this.baseUrl}/Blogs/${id}`);
  }
}
