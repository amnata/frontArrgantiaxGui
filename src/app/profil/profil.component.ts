// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { UserService } from '../services/user.service';
// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';


// interface UserProfile {
//   id: number;
//   email: string;
//   nom: string;
//   prenom: string;
//   createdAt: string;
// }
// @Component({
//   selector: 'app-profil',
//   imports: [CommonModule],
//   templateUrl: './profil.component.html',
//   styleUrl: './profil.component.scss'
// })
// export class ProfilComponent implements OnInit {
//   user: UserProfile | null = null;
//   loading = true;
//   private apiUrl = 'http://localhost:8080/api';

//   constructor(
//     private http: HttpClient,
//     private router: Router
//   ) {}

//   ngOnInit() {
//     this.loadUserProfile();
//   }

//   loadUserProfile() {
//     // Récupérer le token depuis le localStorage
//     const token = localStorage.getItem('token');
    
//     if (!token) {
//       this.router.navigate(['/login']);
//       return;
//     }

//     // Appel API pour récupérer le profil
//     this.http.get<UserProfile>(`${this.apiUrl}/me`, {
//     headers: { 'Authorization': `Bearer ${token}` }
//   }).subscribe({
//       next: (data) => {
//         this.user = data;
//         this.loading = false;
//       },
//       error: (error) => {
//         console.error('Error loading profile:', error);
//         this.loading = false;
//         // Si token invalide, rediriger vers login
//         if (error.status === 401) {
//           localStorage.removeItem('token');
//           this.router.navigate(['/login']);
//         }
//       }
//     });
//   }

//  getInitials() {
//   if (!this.user) return '?';
//   return (this.user.prenom.charAt(0) + this.user.nom.charAt(0)).toUpperCase();
// }


//  formatDate(dateString: string | undefined) {
//   if (!dateString) return '';
//   const date = new Date(dateString);
//   return date.toLocaleDateString('fr-FR');
// }


//   goBack() {
//     this.router.navigate(['/home']);
//   }

//   changePassword() {
//     this.router.navigate(['/reset-password']);
//   }
// }


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface UserProfile {
  id: number;
  email: string;
  nom: string;
  prenom: string;
  createdAt: string;
}

@Component({
  selector: 'app-profil',
  imports: [CommonModule],
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']   // ✔ corrigé
})
export class ProfilComponent implements OnInit {

  user: UserProfile | null = null;
  loading = true;
  private apiUrl = 'http://localhost:8080/api';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

 ngOnInit() {
    // Charger immédiatement depuis localStorage (rapide)
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.user = JSON.parse(savedUser);
    }

    // Ensuite actualiser avec l'API (secondaire)
    this.loadUserProfile();
  }

  loadUserProfile() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    this.http.get<UserProfile>(`${this.apiUrl}/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).subscribe({
      next: (data) => {
        this.user = data;
        localStorage.setItem('user', JSON.stringify(data));  // ✔ on sauvegarde !
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading profile:', error);
        this.loading = false;

        if (error.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          this.router.navigate(['/login']);
        }
      }
    });
  }


  // loadUserProfile() {
  //   const token = localStorage.getItem('token'); 

  //   if (!token) {
  //     this.router.navigate(['/login']);
  //     return;
  //   }

  //   this.http.get<UserProfile>(`${this.apiUrl}/me`, {   // ✔ route corrigée
  //     headers: { 'Authorization': `Bearer ${token}` }
  //   }).subscribe({
  //     next: (data) => {
  //       this.user = data;
  //       this.loading = false;
  //     },
  //     error: (error) => {
  //       console.error('Error loading profile:', error);
  //       this.loading = false;

  //       if (error.status === 401) {
  //         localStorage.removeItem('token');  // ✔ corrigé
  //         this.router.navigate(['/login']);
  //       }
  //     }
  //   });
  // }

  getInitials() {
    if (!this.user) return '?';
    return (this.user.prenom.charAt(0) + this.user.nom.charAt(0)).toUpperCase();
  }

  formatDate(dateString: string | undefined) {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('fr-FR');
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  changePassword() {
    this.router.navigate(['/reset-password']);
  }
}













