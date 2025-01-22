import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserDto } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private readonly TOKEN_KEY = 'token';
  private readonly USER_KEY = 'currentUser';
  private readonly TOKEN_EXPIRY_KEY = 'tokenExpiry';
  private readonly SESSION_DURATION = 3600000; // 1 hour in milliseconds

  private currentUserSubject = new BehaviorSubject<UserDto | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private router: Router) {
    this.initializeSession();
    this.setupSessionCheck();
  }

  private initializeSession(): void {
    const user = this.getStoredUser();
    if (user) {
      this.currentUserSubject.next(user);
    }
    if (this.isTokenExpired()) {
      this.clearSession();
    }
  }

  private setupSessionCheck(): void {
    // Vérifier la session toutes les minutes
    setInterval(() => {
      if (this.isTokenExpired()) {
        this.clearSession();
        this.router.navigate(['/login']);
      }
    }, 60000);
  }

  setSession(token: string, user: UserDto): void {
    const expiryTime = new Date().getTime() + this.SESSION_DURATION;
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    localStorage.setItem(this.TOKEN_EXPIRY_KEY, expiryTime.toString());
    this.currentUserSubject.next(user);
  }

  clearSession(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.TOKEN_EXPIRY_KEY);
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentUser(): UserDto | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !this.isTokenExpired() && !!this.getToken();
  }

  private isTokenExpired(): boolean {
    const expiry = localStorage.getItem(this.TOKEN_EXPIRY_KEY);
    if (!expiry) return true;
    return new Date().getTime() > parseInt(expiry, 10);
  }

  private getStoredUser(): UserDto | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  refreshSession(): void {
    if (this.isAuthenticated()) {
      const expiryTime = new Date().getTime() + this.SESSION_DURATION;
      localStorage.setItem(this.TOKEN_EXPIRY_KEY, expiryTime.toString());
    }
  }
}
