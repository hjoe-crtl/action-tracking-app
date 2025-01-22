import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

export interface ErrorDetails {
  message: string;
  type: 'error' | 'warning' | 'info';
  technical?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  private readonly DEFAULT_ERROR = 'Une erreur inattendue est survenue. Veuillez réessayer.';
  private readonly NETWORK_ERROR = 'Erreur de connexion au serveur. Veuillez vérifier votre connexion internet.';
  private readonly VALIDATION_ERROR = 'Certaines données sont invalides. Veuillez vérifier vos entrées.';
  private readonly AUTH_ERROR = 'Erreur d\'authentification. Veuillez vous reconnecter.';

  handleError(error: any): ErrorDetails {
    console.error('Error caught:', error);

    if (!navigator.onLine) {
      return {
        message: this.NETWORK_ERROR,
        type: 'warning'
      };
    }

    if (error instanceof HttpErrorResponse) {
      return this.handleHttpError(error);
    }

    return {
      message: this.DEFAULT_ERROR,
      type: 'error',
      technical: error?.message || 'Unknown error'
    };
  }

  private handleHttpError(error: HttpErrorResponse): ErrorDetails {
    switch (error.status) {
      case 0:
        return {
          message: this.NETWORK_ERROR,
          type: 'warning'
        };

      case 400:
        return this.handleValidationError(error);

      case 401:
        return {
          message: this.AUTH_ERROR,
          type: 'error'
        };

      case 403:
        return {
          message: 'Vous n\'avez pas les droits nécessaires pour effectuer cette action.',
          type: 'error'
        };

      case 404:
        return {
          message: 'La ressource demandée n\'existe pas.',
          type: 'warning'
        };

      case 409:
        return {
          message: error.error?.message || 'Un conflit est survenu avec les données existantes.',
          type: 'warning'
        };

      case 422:
        return {
          message: this.VALIDATION_ERROR,
          type: 'warning',
          technical: this.formatValidationErrors(error.error?.errors)
        };

      case 500:
        return {
          message: 'Une erreur serveur est survenue. Veuillez réessayer ultérieurement.',
          type: 'error',
          technical: error.error?.message
        };

      default:
        return {
          message: this.DEFAULT_ERROR,
          type: 'error',
          technical: `Status: ${error.status}, Message: ${error.message}`
        };
    }
  }

  private handleValidationError(error: HttpErrorResponse): ErrorDetails {
    if (error.error?.message) {
      return {
        message: error.error.message,
        type: 'warning'
      };
    }

    if (error.error?.errors) {
      return {
        message: this.VALIDATION_ERROR,
        type: 'warning',
        technical: this.formatValidationErrors(error.error.errors)
      };
    }

    return {
      message: this.VALIDATION_ERROR,
      type: 'warning'
    };
  }

  private formatValidationErrors(errors: any): string {
    if (!errors) return '';
    
    if (Array.isArray(errors)) {
      return errors.join(', ');
    }
    
    if (typeof errors === 'object') {
      return Object.values(errors).join(', ');
    }
    
    return String(errors);
  }
}
