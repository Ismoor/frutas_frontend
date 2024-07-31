import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Info } from '../models/info';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  private apiUrl = 'http://18.220.242.169:3030/api/v1/info';

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

  getInfos(): Observable<Info[]> {
    return this.http.get<Info[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  updateInfo(id: string, info: Info): Observable<Info> {
    return this.http.put<Info>(`${this.apiUrl}/${id}`, info, { headers: this.getHeaders() });
  }

  deleteInfo(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  createInfo(info: Info): Observable<Info> {
    return this.http.post<Info>(this.apiUrl, info, { headers: this.getHeaders() });
  }
}
