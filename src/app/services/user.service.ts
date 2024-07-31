import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://18.220.242.169:3030/api/v1';

  constructor(private http: HttpClient) { }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getHttpOptions() {
    const token = this.getToken();
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return { headers };
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/usuarios`, this.getHttpOptions());
  }

  updateUser(cedula: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/usuarios/${cedula}`, user, this.getHttpOptions());
  }

  changePassword(cedula: string, oldPassword: string, newPassword: string): Observable<any> {
    const body = { oldPassword, newPassword };
    return this.http.put(`${this.apiUrl}/usuarios/${cedula}/change-password`, body, this.getHttpOptions());
  }
}
