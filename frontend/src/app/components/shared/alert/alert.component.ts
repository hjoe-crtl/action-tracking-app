import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  template: `
    <div *ngIf="message" class="alert" [ngClass]="'alert-' + type" role="alert">
      {{ message }}
      <button type="button" class="btn-close" (click)="message = ''" aria-label="Close"></button>
    </div>
  `,
  styles: [`
    .alert {
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
  `]
})
export class AlertComponent {
  @Input() message: string = '';
  @Input() type: 'success' | 'danger' | 'warning' | 'info' = 'info';
}
