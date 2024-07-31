import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { UserLogin } from "../../models/userLogin";
import { LoginService } from "../../services/login.service";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";
  errorMessage: string = ""; // Variable para almacenar el mensaje de error
  isSubmitting: boolean = false; // Variable para controlar el estado de envío

  constructor(
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef // Inyectar ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  logIn(): void {
    if (this.isSubmitting) {
      return; // Si ya se está enviando, no hacer nada
    }

    this.isSubmitting = true; // Iniciar el estado de envío

    const loginUser: UserLogin = {
      correo: this.email,
      password: this.password,
    };
    this.loginService.logIn(loginUser).subscribe(
      (response) => {
        const perfil = Number(response.perfil); 
        const cedula = response.cedula; 
        this.authService.login(response.token, perfil, cedula);
        this.isSubmitting = false; // Terminar el estado de envío
        if (perfil === 1) {
          this.router.navigate(['/registro']);
        } else if (perfil === 2) {
          this.router.navigate(['/operador']);
        }
      },
      error => {
        this.isSubmitting = false; // Terminar el estado de envío
        this.errorMessage = error.error.error || 'Error al iniciar sesión'; // Guardar el mensaje de error
        this.cdr.detectChanges(); // Detectar cambios manualmente
        console.error('Log In failed:', error);
      }
    );
  }
}
