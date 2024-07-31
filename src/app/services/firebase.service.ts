import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Firebase } from '../models/firebase';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private firebaseUrl = 'http://192.168.17.112:3030/api/v1/firebase';

  constructor(private http: HttpClient) {}

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? 'Bearer ' + token : ''
    });
  }

  getFirebaseData(): Observable<Firebase[]> {
    return this.http.get<Firebase[]>(`${this.firebaseUrl}`, { headers: this.getHeaders() });
  }

}
