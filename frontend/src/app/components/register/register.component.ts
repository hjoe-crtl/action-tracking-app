import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../models/auth.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  alertMessage = '';
  alertType: 'success' | 'danger' = 'danger';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      structureId: [null]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.loading = true;
      this.alertMessage = '';
      
      const userData: RegisterRequest = this.registerForm.value;
      
      this.authService.register(userData).subscribe({
        next: (response) => {
          this.alertMessage = response.message;
          this.alertType = 'success';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (error) => {
          console.error('Erreur d\'inscription:', error);
          if (error.status === 400) {
            if (error.error?.message) {
              this.alertMessage = error.error.message;
            } else if (error.error?.errors) {
              this.alertMessage = Object.values(error.error.errors).join(', ');
            } else {
              this.alertMessage = 'Les données fournies sont invalides';
            }
          } else {
            this.alertMessage = 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.';
          }
          this.alertType = 'danger';
          this.loading = false;
        }
      });
    } else {
      this.markFormGroupTouched(this.registerForm);
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
    const control = this.registerForm.get(controlName);
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return `Le champ ${controlName} est requis`;
      }
      if (control.errors['minlength']) {
        return `Le champ ${controlName} doit contenir au moins ${control.errors['minlength'].requiredLength} caractères`;
      }
      if (control.errors['email']) {
        return 'Veuillez entrer une adresse email valide';
      }
    }
    return '';
  }
}
