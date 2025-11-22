
// import { Component } from '@angular/core';
// import { Router, RouterModule } from '@angular/router';
// import { AuthService } from '../services/auth.service';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';


// @Component({
//   selector: 'app-login',
//   imports: [CommonModule, FormsModule, RouterModule],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.scss'
// })
// export class LoginComponent {
//   email = '';
//   password = '';
//   loading = false;
//   error = '';
//   showPassword = false;

//   constructor(
//     private authService: AuthService,
//     private router: Router
//   ) {}

//   onSubmit(): void {
//     if (!this.email || !this.password) {
//       this.error = 'Veuillez remplir tous les champs';
//       return;
//     }

//     if (!this.isValidEmail(this.email)) {
//       this.error = 'Veuillez entrer un email valide';
//       return;
//     }

//     this.loading = true;
//     this.error = '';

//     this.authService.login({ email: this.email, password: this.password }).subscribe({
//       next: (response) => {
//         console.log('✅ Connexion réussie', response);
//         this.loading = false;
//         this.router.navigate(['/home']); 
//       },
//       error: (err) => {
//         console.error('❌ Erreur de connexion', err);
//         this.loading = false;
//         if (err.status === 401) {
//           this.error = 'Email ou mot de passe incorrect';
//         } else if (err.status === 0) {
//           this.error = 'Impossible de contacter le serveur';
//         } else {
//           this.error = err.error?.message || 'Une erreur est survenue';
//         }
//       }
//     });
//   }

//   togglePasswordVisibility(): void {
//     this.showPassword = !this.showPassword;
//   }

//   isValidEmail(email: string): boolean {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   }
// }


import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  error = '';
  showPassword = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.email || !this.password) {
      this.error = 'Veuillez remplir tous les champs';
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.error = 'Veuillez entrer un email valide';
      return;
    }

    this.loading = true;
    this.error = '';

    console.log('🔑 Tentative de connexion:', this.email);

    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        console.log('✅ Connexion réussie', response);
        
        // Vérifier immédiatement que tout est sauvegardé
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        
        console.log('🔍 Vérification immédiate:');
        console.log('  - Token:', !!token);
        console.log('  - UserId:', userId);
        
        if (!token || !userId) {
          console.error('❌ ERREUR: Token ou UserId manquant !');
          this.error = 'Erreur de connexion - données manquantes';
          this.loading = false;
          return;
        }
        
        this.loading = false;
        
        // Attendre un peu avant de rediriger
        setTimeout(() => {
          console.log('🔄 Redirection vers /home');
          this.router.navigate(['/home']);
        }, 200);
      },
      error: (err) => {
        console.error('❌ Erreur de connexion', err);
        this.loading = false;
        
        if (err.status === 401) {
          this.error = 'Email ou mot de passe incorrect';
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

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}