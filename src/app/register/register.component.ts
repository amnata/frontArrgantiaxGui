
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  nom = '';
  prenom = '';
  email = '';
  password = '';
  confirmPassword = '';
  loading = false;
  error = '';
  success = '';
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    // Validation
    if (!this.nom || !this.prenom || !this.email || !this.password || !this.confirmPassword) {
      this.error = 'Veuillez remplir tous les champs';
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.error = 'Veuillez entrer un email valide';
      return;
    }

    if (this.password.length < 6) {
      this.error = 'Le mot de passe doit contenir au moins 6 caractères';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error = 'Les mots de passe ne correspondent pas';
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    const registerData = {
      nom: this.nom,
      prenom: this.prenom,
      email: this.email,
      password: this.password
    };

    this.authService.register(registerData).subscribe({
      next: (response) => {
        console.log('✅ Inscription réussie', response);
        this.loading = false;
        this.success = 'Inscription réussie ! Redirection vers la connexion...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        console.error('❌ Erreur d\'inscription', err);
        this.loading = false;
        if (err.status === 409) {
          this.error = 'Cet email est déjà utilisé';
        } else if (err.status === 0) {
          this.error = 'Impossible de contacter le serveur';
        } else {
          this.error = err.error?.message || 'Une erreur est survenue';
        }
      }
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}