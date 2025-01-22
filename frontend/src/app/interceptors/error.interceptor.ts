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
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../services/error-handler.service';
import { SessionService } from '../services/session.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private errorHandler: ErrorHandlerService,
    private sessionService: SessionService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Gérer les erreurs d'authentification
        if (error.status === 401) {
          this.sessionService.clearSession();
          this.router.navigate(['/login']);
        }

        // Gérer les erreurs d'autorisation
        if (error.status === 403) {
          this.router.navigate(['/unauthorized']);
        }

        // Utiliser le ErrorHandlerService pour formater l'erreur
        const errorDetails = this.errorHandler.handleError(error);
        return throwError(() => errorDetails);
      })
    );
  }
}
