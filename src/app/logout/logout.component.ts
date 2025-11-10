
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [],
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
      // Ici on supprime le token / session (exemple localStorage)
      localStorage.removeItem('token');
      this.message = 'Vous êtes déconnecté avec succès !';

      setTimeout(() => {
        this.router.navigate(['/login']); // redirection après déconnexion
      }, 1500);
    } catch (e) {
      this.error = 'Erreur lors de la déconnexion.';
    } finally {
      this.loading = false;
    }
  }
}
