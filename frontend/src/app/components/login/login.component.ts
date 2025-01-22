import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  alertMessage = '';
  alertType: 'success' | 'danger' = 'danger';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.alertMessage = '';
      
      const { username, password } = this.loginForm.value;
      
      this.authService.login(username, password).subscribe({
        next: () => {
          this.alertType = 'success';
          this.alertMessage = 'Connexion réussie ! Redirection...';
          setTimeout(() => {
            this.router.navigate(['/actions']);
          }, 1000);
        },
        error: (error) => {
          console.error('Erreur de connexion:', error);
          if (error.status === 401) {
            this.alertMessage = 'Nom d\'utilisateur ou mot de passe incorrect';
          } else if (error.status === 400) {
            this.alertMessage = error.error?.message || 'Données de connexion invalides';
          } else {
            this.alertMessage = 'Une erreur est survenue lors de la connexion. Veuillez réessayer.';
          }
          this.alertType = 'danger';
          this.loading = false;
        }
      });
    } else {
      this.markFormGroupTouched(this.loginForm);
      this.alertMessage = 'Veuillez corriger les erreurs dans le formulaire';
      this.alertType = 'danger';
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return `Le champ ${controlName} est requis`;
      }
      if (control.errors['minlength']) {
        return `Le champ ${controlName} doit contenir au moins ${control.errors['minlength'].requiredLength} caractères`;
      }
    }
    return '';
  }
}
