// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ClassifierCultureService {
//   private springBootBaseUrl = 'http://localhost:8080/api/detect';

//   constructor(private http: HttpClient) { }

//   healthCheck(): Observable<any> {
//     return this.http.get(`${this.springBootBaseUrl}/health`);
//   }

//   classifieculture(file: File): Observable<any> {
//     const formData = new FormData();
//     formData.append('file', file); // ← "file" pour Spring Boot
//     return this.http.post(`${this.springBootBaseUrl}/plant`, formData);
//   }

// }

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassifierCultureService {
  private springBootBaseUrl = 'http://localhost:8080/api/detect';
  
  constructor(private http: HttpClient) { }
  
  healthCheck(): Observable<any> {
    return this.http.get(`${this.springBootBaseUrl}/health`);
  }
  
  classifieculture(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.springBootBaseUrl}/plant`, formData);
  }
}