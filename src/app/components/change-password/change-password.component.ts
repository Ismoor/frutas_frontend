import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  isSubmitting: boolean = false;
  errorMessage: string = '';
  showModal: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6), this.validarPassword.bind(this)]],
      confirmNewPassword: ['', [Validators.required]]
    });
  }

  validarPassword(control: FormControl): { [key: string]: any } | null {
    const password = control.value;
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!regex.test(password)) {
      return { passwordInvalida: true };
    }
    return null;
  }

  ngOnInit(): void {}

  validatePasswords(): void {
    const { oldPassword, newPassword, confirmNewPassword } = this.changePasswordForm.value;
    
    if (!this.changePasswordForm.controls['oldPassword'].valid || 
        !this.changePasswordForm.controls['newPassword'].valid || 
        !this.changePasswordForm.controls['confirmNewPassword'].valid) {
      this.errorMessage = 'Por favor, completa todos los campos correctamente';
      return;
    }
    
    if (newPassword !== confirmNewPassword) {
      this.errorMessage = 'Las nuevas contraseñas no coinciden';
      return;
    }

    this.errorMessage = '';
    this.showModal = true; // Mostrar el modal de confirmación
  }

  closeModal(): void {
    this.showModal = false;
  }

  onSubmit(): void {
    if (this.changePasswordForm.valid) {
      const { oldPassword, newPassword } = this.changePasswordForm.value;
  
      this.isSubmitting = true;
      this.errorMessage = '';
  
      const cedula = this.authService.userCedula;
      if (!cedula) {
        this.errorMessage = 'No se ha podido obtener la cédula del usuario';
        this.isSubmitting = false;
        return;
      }
  
      this.userService.changePassword(cedula, oldPassword, newPassword).subscribe(
        response => {
          this.isSubmitting = false;
          this.authService.logout();
          this.router.navigate(['/login']);
        },
        error => {
          this.isSubmitting = false;
          if (error.status === 401) {
            this.errorMessage = 'Contraseña antigua incorrecta';
          } else {
            this.errorMessage = error.error.error || 'Error al cambiar la contraseña';
          }
        }
      );
    }
  }
}
