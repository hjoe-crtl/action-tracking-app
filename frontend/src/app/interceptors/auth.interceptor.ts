import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private sessionService: SessionService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.sessionService.getToken();
    
    if (token && !this.isAuthUrl(request.url)) {
      request = request.clone({
        setHeaders: {
          Authorization: token
        }
      });
    }
    
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.sessionService.clearSession();
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }

  private isAuthUrl(url: string): boolean {
    return url.includes('/api/auth/login') || url.includes('/api/auth/register');
  }
}
