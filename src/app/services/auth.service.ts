import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject: BehaviorSubject<boolean>;
  public isAuthenticated$: Observable<boolean>;
  private userProfileSubject: BehaviorSubject<number | null>;
  public userProfile$: Observable<number | null>;
  private userCedulaSubject: BehaviorSubject<string | null>;
  public userCedula$: Observable<string | null>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private localStorageService: LocalStorageService
  ) {
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    this.isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
    this.userProfileSubject = new BehaviorSubject<number | null>(null);
    this.userProfile$ = this.userProfileSubject.asObservable();
    this.userCedulaSubject = new BehaviorSubject<string | null>(null);
    this.userCedula$ = this.userCedulaSubject.asObservable();
    this.checkAuthenticated();
  }

  checkAuthenticated(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = this.localStorageService.getItem('authToken');
      const perfil = this.localStorageService.getItem('userProfile');
      const cedula = this.localStorageService.getItem('userCedula');
      this.isAuthenticatedSubject.next(!!token);
      this.userProfileSubject.next(perfil ? parseInt(perfil) : null);
      this.userCedulaSubject.next(cedula ? cedula : null);
    }
  }

  login(token: string, perfil: number, cedula: string): void {
    if (isPlatformBrowser(this.platformId)) {
      this.localStorageService.setItem('authToken', token);
      this.localStorageService.setItem('userProfile', perfil.toString());
      this.localStorageService.setItem('userCedula', cedula);
      this.isAuthenticatedSubject.next(true);
      this.userProfileSubject.next(perfil);
      this.userCedulaSubject.next(cedula);
    }
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.localStorageService.removeItem('authToken');
      this.localStorageService.removeItem('userProfile');
      this.localStorageService.removeItem('userCedula');
      this.isAuthenticatedSubject.next(false);
      this.userProfileSubject.next(null);
      this.userCedulaSubject.next(null);
    }
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  get loggedIn(): boolean {
    return !!this.localStorageService.getItem("authToken");
  }

  get userProfile(): number | null {
    const perfil = this.localStorageService.getItem("userProfile");
    return perfil ? Number(perfil) : null;
  }

  get userCedula(): string | null {
    return this.userCedulaSubject.value;
  }
}
