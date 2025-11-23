// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {

//   private baseUrl = 'http://localhost:8080/api/users';

//   constructor(private http: HttpClient) {}

//   getUserById(id: number): Observable<any> {
//     return this.http.get(`${this.baseUrl}/${1}`);
//   }

//   getCurrentUser(): Observable<any> {
//     return this.http.get(`${this.baseUrl}/me`);
//   }

// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface User {
  id: number;
  email: string;
  nom: string;
  prenom: string;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api';
  
  // BehaviorSubject pour stocker l'utilisateur courant
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // Charger user depuis localStorage si existant
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  // Récupérer le user courant depuis le backend et mettre à jour le BehaviorSubject
  fetchCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/me`).pipe(
      tap(user => {
        this.currentUserSubject.next(user);
        localStorage.setItem('user', JSON.stringify(user));
      })
    );
  }

  // Optionnel : récupérer user par id
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`);
  }

  // Retourne la valeur actuelle synchronisée
  getCurrentUserValue(): User | null {
    return this.currentUserSubject.value;
  }
}
