import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Qoutation } from 'src/app/models/qoutation';

@Injectable({
  providedIn: 'root'
})
export class QuatationsService {
  baseUrl = 'http://mogasoft.runasp.net/api';
  constructor(private http: HttpClient) { }
  getQuotes(): Observable<Qoutation> {
    return this.http.get<Qoutation>(`${this.baseUrl}/Quotations`);
  }
  postQuote(quote: Qoutation): Observable<Qoutation> {
    return this.http.post<Qoutation>(`${this.baseUrl}/Quotations`, quote);
  }
  deleteQuote(id: number): Observable<Qoutation> {
    return this.http.delete<Qoutation>(`${this.baseUrl}/Quotations/${id}`);
  }
}
