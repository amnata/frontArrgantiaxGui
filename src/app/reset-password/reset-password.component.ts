
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

  email = '';
  loading = false;
  error = '';
  success = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.email) {
      this.error = 'Veuillez entrer votre email';
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.error = 'Veuillez entrer un email valide';
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    this.authService.resetPassword({ email: this.email }).subscribe({
      next: (response) => {
        console.log('✅ Email de réinitialisation envoyé', response);
        this.loading = false;
        this.success = 'Un email de réinitialisation a été envoyé à votre adresse';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (err) => {
        console.error('❌ Erreur de réinitialisation', err);
        this.loading = false;
        if (err.status === 404) {
          this.error = 'Aucun compte trouvé avec cet email';
        } else if (err.status === 0) {
          this.error = 'Impossible de contacter le serveur';
        } else {
          this.error = err.error?.message || 'Une erreur est survenue';
        }
      }
    });
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
