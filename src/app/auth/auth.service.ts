import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environment/prod';
import { User } from '../model/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = environment.apiUrl + '/auth';
  private readonly TOKEN_KEY = 'token';

  private authStatusSubject = new BehaviorSubject<boolean>(this.isTokenAvailable());
  authStatus$ = this.authStatusSubject.asObservable();

  constructor(private http: HttpClient) {
    console.log('AuthService initialisé');
  }

  private isTokenAvailable(): boolean {
    const available = !!localStorage.getItem(this.TOKEN_KEY);
    console.log('isTokenAvailable:', available);
    return available;
  }

  login(credentials: any): Observable<any> {
    console.log('Tentative de connexion avec :', credentials);
    return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
      tap((res: any) => {
        console.log('Connexion réussie, token reçu :', res.token);
        localStorage.setItem(this.TOKEN_KEY, res.token);
        this.authStatusSubject.next(true);
      })
    );
  }

  logout(): void {
    console.log('Déconnexion de l\'utilisateur');
    localStorage.removeItem(this.TOKEN_KEY);
    this.authStatusSubject.next(false);
  }

  getToken(): string | null {
    const token = localStorage.getItem(this.TOKEN_KEY);
    console.log('Récupération du token :', token);
    return token;
  }

  isLoggedIn(): boolean {
    const loggedIn = this.isTokenAvailable();
    console.log('isLoggedIn:', loggedIn);
    return loggedIn;
  }

  getCurrentUser(): Observable<User> {
    console.log('Appel API pour récupérer l\'utilisateur courant');
    return this.http.get<User>(`${this.baseUrl}/me`);
  }

  register(data: any): Observable<any> {
    console.log('Enregistrement avec les données :', data);
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (!token) {
      console.log('Token non présent, utilisateur non authentifié');
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationDate = payload.exp * 1000;
      const currentTime = Date.now();
      const isValid = expirationDate > currentTime;
      console.log('isAuthenticated: payload =', payload);
      console.log('Token expire à:', new Date(expirationDate));
      console.log('Heure actuelle:', new Date(currentTime));
      console.log('Token valide ?', isValid);
      return isValid;
    } catch (error) {
      console.error('Erreur lors du décodage du token', error);
      return false;
    }
  }

  getUserFromToken(): any | null {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (!token) {
      console.log('Pas de token disponible pour extraire un utilisateur');
      return null;
    }

    try {
      const user = JSON.parse(atob(token.split('.')[1]));
      console.log('Utilisateur extrait du token :', user);
      return user;
    } catch (e) {
      console.error('Erreur de décodage du token :', e);
      return null;
    }
  }
}
