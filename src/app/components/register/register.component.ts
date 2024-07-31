import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  nombres: string = "";
  cedula: string = "";
  reg_email: string = "";
  reg_password: string = "";
  perfil: number = 0;

  mensajeExito: string = "";
  mensajeError: string = "";

  registroRealizado: boolean = false;
  emailValido: boolean = true;
  passwordValida: boolean = true;

  showModal: boolean = false;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  validarCorreo(correo: string): boolean {
    const regex = /^([a-zA-Z0-9._%+-]+@(est\.)?ups\.edu\.ec)$/;
    return regex.test(correo);
  }

  validarPassword(password: string): boolean {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return regex.test(password);
  }

  confirmarRegistro() {
    this.emailValido = this.validarCorreo(this.reg_email);
    this.passwordValida = this.validarPassword(this.reg_password);

    if (this.emailValido && this.passwordValida) {
      // Mostrar el modal de confirmación
      this.showModal = true;
    } else {
      this.mensajeError = "Corrija los errores en el formulario.";
    }
  }

  closeModal() {
    this.showModal = false;
  }

  registro() {
    this.closeModal(); // Ocultar el modal de confirmación

    const newUser: User = {
      nombres: this.nombres,
      cedula: this.cedula,
      correo: this.reg_email,
      password: this.reg_password,
      perfil: this.perfil
    };

    this.loginService.registroUsuario(newUser).subscribe(
      (response) => {
        console.log("Usuario registrado:", response);
        this.registroRealizado = true;
        this.mensajeExito = "Usuario registrado exitosamente.";
        this.mensajeError = ""; // Limpiar mensaje de error
      },
      (error) => {
        console.error("Error al registrar usuario:", error);
        this.mensajeError = "Error al registrar usuario. Inténtalo de nuevo.";
        this.mensajeExito = ""; // Limpiar mensaje de éxito
      }
    );
  }
}
