import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;
  isFormLocked = true;
  userForm: FormGroup;
  showModal: boolean = false;

  emailValido: boolean = true;
  passwordValida: boolean = true;

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      nombres: [{ value: '', disabled: true }, Validators.required],
      cedula: [{ value: '', disabled: true }, Validators.required],
      correo: [{ value: '', disabled: true }, [Validators.required, Validators.email, this.validarCorreo.bind(this)]],
      password: [{ value: '', disabled: true }, [Validators.required, this.validarPassword.bind(this)]],
      perfil: [{ value: '', disabled: true }, Validators.required]
    });
  }

  validarCorreo(control: FormControl): { [key: string]: any } | null {
    const correo = control.value;
    const regex = /^([a-zA-Z0-9._%+-]+@(est\.)?ups\.edu\.ec)$/;
    if (!regex.test(correo)) {
      return { correoInvalido: true };
    }
    return null;
  }

  validarPassword(control: FormControl): { [key: string]: any } | null {
    const password = control.value;
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!regex.test(password)) {
      return { passwordInvalida: true };
    }
    return null;
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    }, error => {
      console.error('Error fetching users', error);
    });
  }

  onSelectUser(user: User): void {
    this.selectedUser = { ...user };
    this.isFormLocked = false;
    this.userForm.patchValue(user);
    this.userForm.enable();
  }

  confirmUpdate(): void {
    if (this.userForm.valid) {
      this.showModal = true; // Mostrar el modal de confirmación
    }
  }

  closeModal(): void {
    this.showModal = false;
  }

  onSubmit(): void {
    if (this.selectedUser && this.userForm.valid) {
      const updatedUser: User = {
        ...this.selectedUser,
        ...this.userForm.value
      };
      this.userService.updateUser(this.selectedUser.cedula, updatedUser).subscribe(updatedUser => {
        this.isFormLocked = true;
        this.getUsers();
        this.userForm.reset();
        this.userForm.disable();
        this.closeModal();
      }, error => {
        console.error('Error updating user', error);
      });
    }
  }
}
