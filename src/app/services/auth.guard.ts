import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const loggedIn = this.authService.loggedIn;
    const profile = this.authService.userProfile;
    const currentUrl = state.url;

    if (loggedIn) {
      if (currentUrl === '/login' || currentUrl === '/aboutUs' || currentUrl === '/home') {
        if (profile === 1) {
          this.router.navigate(['/registro']);
        } else if (profile === 2) {
          this.router.navigate(['/operador']);
        }
        return false;
      }

      // Reglas de redirección basadas en el perfil del usuario
      if (profile === 1 && (currentUrl.includes('/operador') || currentUrl.includes('/info') || currentUrl.includes('/firebase-data') || currentUrl.includes('/changePassword'))) {
        this.router.navigate(['/registro']);
        return false;
      }

      if (profile === 2 && (currentUrl.includes('/registro') || currentUrl.includes('/updateUser') || currentUrl.includes('/updateInfo') || currentUrl.includes('/createInfo'))) {
        this.router.navigate(['/operador']);
        return false;
      }

      return true;
    }

    // Redirigir usuarios no autenticados a la página de login
    if (!loggedIn && (currentUrl !== '/login' && currentUrl !== '/aboutUs' && currentUrl !== '/home')) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
