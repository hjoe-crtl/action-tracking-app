import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Ne pas afficher le loader pour certaines requêtes (par exemple, les requêtes de rafraîchissement automatique)
    if (request.headers.get('skip-loader')) {
      return next.handle(request);
    }

    this.loadingService.setLoading(true, request.url);
    
    return next.handle(request).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            this.loadingService.setLoading(false, request.url);
          }
        },
        error => {
          this.loadingService.setLoading(false, request.url);
        }
      ),
      finalize(() => {
        this.loadingService.setLoading(false, request.url);
      })
    );
  }
}
