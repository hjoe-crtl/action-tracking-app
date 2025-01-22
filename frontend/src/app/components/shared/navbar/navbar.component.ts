import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { TokenPayload } from '../../../models/auth.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <a class="navbar-brand" routerLink="/">Action Tracking</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item" *ngIf="isLoggedIn">
              <a class="nav-link" routerLink="/actions" routerLinkActive="active">Actions</a>
            </li>
          </ul>
          <ul class="navbar-nav">
            <ng-container *ngIf="!isLoggedIn">
              <li class="nav-item">
                <a class="nav-link" routerLink="/login" routerLinkActive="active">Connexion</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" routerLink="/register" routerLinkActive="active">Inscription</a>
              </li>
            </ng-container>
            <li class="nav-item" *ngIf="isLoggedIn">
              <div class="nav-link user-info">
                <span class="me-2">{{ getUserName() }}</span>
                <button (click)="onLogout()" class="btn btn-outline-light btn-sm">
                  Déconnexion
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .user-info {
      display: flex;
      align-items: center;
    }
  `]
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  currentUser: TokenPayload | null = null;
  private authSubscription?: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.currentUser$.subscribe(
      (user: TokenPayload | null) => {
        this.currentUser = user;
        this.isLoggedIn = !!user;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getUserName(): string {
    return this.currentUser ? `${this.currentUser.prenom} ${this.currentUser.nom}` : '';
  }
}
