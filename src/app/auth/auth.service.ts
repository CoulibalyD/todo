import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environment/prod';
import { User } from '../model/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = environment.apiUrl + '/auth';

  private authStatusSubject = new BehaviorSubject<boolean>(this.isTokenAvailable());
  authStatus$ = this.authStatusSubject.asObservable(); // expose l'état observable

  constructor(private http: HttpClient) {}

  private isTokenAvailable(): boolean {
    return !!localStorage.getItem('token');
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
        this.authStatusSubject.next(true); // notif les abonnés que l'user est connecté
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.authStatusSubject.next(false); // notif les abonnés que l'user est déconnecté
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.isTokenAvailable();
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/me`);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }
}
