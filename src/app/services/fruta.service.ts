import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FrutaService {
  private apiURL = 'http://18.220.242.169:3030/api/v1';

  constructor(private http: HttpClient) { }

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

  addFruta(cedula: string, fruta: any): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/usuarios/${cedula}/frutas`, fruta, { headers: this.getHeaders() });
  }

  getFrutas(cedula: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/usuarios/${cedula}/frutas`, { headers: this.getHeaders() });
  }

  deleteFruta(cedula: string, frutaId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/usuarios/${cedula}/frutas/${frutaId}`, { headers: this.getHeaders() });
  }
}
