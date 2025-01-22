import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  template: `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6 text-center">
          <div class="alert alert-danger">
            <h2 class="mb-4">Accès Non Autorisé</h2>
            <p>Désolé, vous n'avez pas les droits nécessaires pour accéder à cette ressource.</p>
            <div class="mt-4">
              <button class="btn btn-primary me-2" (click)="goBack()">
                Retour
              </button>
              <button class="btn btn-outline-primary" (click)="goHome()">
                Accueil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class UnauthorizedComponent {
  constructor(private router: Router) {}

  goBack(): void {
    window.history.back();
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
