import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {
  loading = false;
  message: string | null = null;
  error: string | null = null;

  constructor(private router: Router) {}

  logout() {
    this.loading = true;
    this.error = null;
    this.message = null;

    try {
      // Suppression du token / session
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      sessionStorage.clear();
      
      this.message = 'Déconnexion réussie ! À bientôt 👋';
      
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1500);
    } catch (e) {
      this.error = 'Erreur lors de la déconnexion. Veuillez réessayer.';
      console.error('Erreur de déconnexion:', e);
    } finally {
      setTimeout(() => {
        this.loading = false;
      }, 300);
    }
  }
}