// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, BehaviorSubject } from 'rxjs';
// import { tap } from 'rxjs/operators';

// export interface User {
//   id: string;
//   email: string;
//   nom: string;
//   prenom: string;
//   token?: string;
// }

// export interface LoginRequest {
//   email: string;
//   password: string;
// }

// export interface RegisterRequest {
//   email: string;
//   password: string;
//   nom: string;
//   prenom: string;
// }

// export interface ResetPasswordRequest {
//   email: string;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private apiUrl = 'http://localhost:8080/api/auth';
//   private currentUserSubject = new BehaviorSubject<User | null>(null);
//   public currentUser$ = this.currentUserSubject.asObservable();

//   constructor(private http: HttpClient) {
//     // Charger l'utilisateur depuis le localStorage au démarrage
//     const storedUser = localStorage.getItem('currentUser');
//     if (storedUser) {
//       this.currentUserSubject.next(JSON.parse(storedUser));
//     }
//   }

//   login(credentials: LoginRequest): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
//       tap(response => {
//         if (response.user && response.token) {
//           const user: User = {
//             ...response.user,
//             token: response.token
//           };
//           localStorage.setItem('currentUser', JSON.stringify(user));
//           localStorage.setItem('token', response.token);
//           this.currentUserSubject.next(user);
//         }
//       })
//     );
//   }

//   register(userData: RegisterRequest): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/register`, userData);
//   }

//   resetPassword(email: ResetPasswordRequest): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/reset-password`, email);
//   }

//   logout(): void {
//     localStorage.removeItem('currentUser');
//     localStorage.removeItem('token');
//     this.currentUserSubject.next(null);
//   }


//   isLoggedIn(): boolean {
//     return !!localStorage.getItem('token'); // ou sessionStorage
//   }

//   isAuthenticated(): boolean {
//     return !!this.currentUserSubject.value;
//   }

//   getCurrentUser(): User | null {
//     return this.currentUserSubject.value;
//   }

//   getToken(): string | null {
//     return localStorage.getItem('token');
//   }
// }


// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          console.log('📥 Réponse complète du login:', response);
          
          // Sauvegarder le token
          if (response.token) {
            localStorage.setItem('token', response.token);
            console.log('✅ Token sauvegardé');
          }
          
          // Sauvegarder userId - deux formats possibles
          if (response.userId) {
            localStorage.setItem('userId', response.userId.toString());
            console.log('✅ UserId sauvegardé (direct):', response.userId);
          } else if (response.user && response.user.id) {
            localStorage.setItem('userId', response.user.id.toString());
            console.log('✅ UserId sauvegardé (depuis user.id):', response.user.id);
          }
          
          // Sauvegarder email
          if (response.email) {
            localStorage.setItem('userEmail', response.email);
          } else if (response.user && response.user.email) {
            localStorage.setItem('userEmail', response.user.email);
          }
          
          // Sauvegarder nom et prénom
          if (response.nom) {
            localStorage.setItem('userNom', response.nom);
          } else if (response.user && response.user.nom) {
            localStorage.setItem('userNom', response.user.nom);
          }
          
          if (response.prenom) {
            localStorage.setItem('userPrenom', response.prenom);
          } else if (response.user && response.user.prenom) {
            localStorage.setItem('userPrenom', response.user.prenom);
          }
          
          // Log final
          console.log('📦 localStorage après login:');
          console.log('  - token:', !!localStorage.getItem('token'));
          console.log('  - userId:', localStorage.getItem('userId'));
          console.log('  - email:', localStorage.getItem('userEmail'));
        })
      );
  }

  register(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, credentials);
  }

  // ✅ AJOUTER cette méthode pour le guard
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const isLogged = !!(token && userId);
    
    console.log('🔐 Vérification isLoggedIn:');
    console.log('  - Token:', !!token);
    console.log('  - UserId:', userId);
    console.log('  - Résultat:', isLogged);
    
    return isLogged;
  }

  // Alias pour compatibilité
  isAuthenticated(): boolean {
    return this.isLoggedIn();
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userNom');
    localStorage.removeItem('userPrenom');
    console.log('👋 Déconnexion - localStorage nettoyé');
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserEmail(): string | null {
    return localStorage.getItem('userEmail');
  }
}