import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  getClientMessage(error: Error): string {
    if (!navigator.onLine) {
      return 'Pas de connexion internet';
    }
    return error.message ? error.message : error.toString();
  }

  getClientStack(error: Error): string {
    return error.stack || '';
  }

  getServerMessage(error: HttpErrorResponse): string {
    if (error.error instanceof ErrorEvent) {
      return 'Erreur de connexion au serveur';
    }

    if (typeof error.error === 'string') {
      return error.error;
    }

    if (error.error?.message) {
      return error.error.message;
    }

    switch (error.status) {
      case 401:
        return 'Non autorisé';
      case 403:
        return 'Accès refusé';
      case 404:
        return 'Ressource non trouvée';
      case 500:
        return 'Erreur serveur';
      default:
        return 'Une erreur est survenue';
    }
  }
}
