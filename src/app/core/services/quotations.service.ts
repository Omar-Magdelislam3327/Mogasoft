import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { Qoutation } from '../models/Qoutation';

@Injectable({
  providedIn: 'root'
})
export class QuotationsService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }
  getQuotes(): Observable<Qoutation> {
    return this.http.get<Qoutation>(`${this.baseUrl}/Quotations`);
  }
  postQuote(quote: FormData): Observable<Qoutation> {
    return this.http.post<Qoutation>(`${this.baseUrl}/Quotations`, quote);
  }
  deleteQuote(id: number): Observable<Qoutation> {
    return this.http.delete<Qoutation>(`${this.baseUrl}/Quotations/${id}`);
  }
}
