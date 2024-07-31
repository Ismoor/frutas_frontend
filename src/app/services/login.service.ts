import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { UserLogin } from '../models/userLogin';
import { User } from '../models/user';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private regUser = "http://192.168.17.112:3030/api/v1/registro";
  private loginUrl = "http://192.168.17.112:3030/api/v1/login";

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {}

  registroUsuario(usuario: User): Observable<User> {
    return this.http.post<User>(this.regUser, usuario);
  }

  logIn(userLogin: UserLogin): Observable<{ token: string, perfil: number, cedula: string }> {
    return this.http.post<{ token: string, perfil: number, cedula: string }>(this.loginUrl, userLogin).pipe(
      map((response) => {
        this.saveToken(response.token);
        return response;
      })
    );
  }

  saveToken(token: string): void {
    this.localStorageService.setItem("authToken", token);
  }

  getToken(): string | null {
    return this.localStorageService.getItem("authToken");
  }

  logOut(): void {
    this.localStorageService.removeItem("authToken");
  }
}
