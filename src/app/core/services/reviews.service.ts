import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { Reviews } from '../models/Reviews';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getReviews(): Observable<Reviews[]> {
    return this.http.get<Reviews[]>(`${this.baseUrl}/Reviews`);
  }
  addReview(review: FormData): Observable<Reviews> {
    return this.http.post<Reviews>(`${this.baseUrl}/Reviews`, review);
  }
  deleteReview(id: number): Observable<Reviews> {
    return this.http.delete<Reviews>(`${this.baseUrl}/Reviews/${id}`);
  }
}
