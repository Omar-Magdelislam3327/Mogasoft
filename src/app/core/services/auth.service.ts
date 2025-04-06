import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.baseUrl;
  private tokenKey = 'authToken';
  private roleKey = 'userRole';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/Auth/Login`, { email, password }).pipe(
      tap((response: any) => {
        if (response?.token) {
          localStorage.setItem(this.tokenKey, response.token);
          localStorage.setItem(this.roleKey, response.role);
          this.isAuthenticatedSubject.next(true);

          if (response.role === 'Admin') {
            this.router.navigate(['/admin/home']);
          } else if (response.role === 'Marketer') {
            this.router.navigate(['/admin/blogs']);
          }
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/home']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}
