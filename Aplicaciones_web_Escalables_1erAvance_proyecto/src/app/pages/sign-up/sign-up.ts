import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  imports: [FormsModule, CommonModule,],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp implements OnInit {
  private authService = inject(AuthService);
  // Campos del formulario de registro
  userData = {
    name: '',
    email: '',
    password: '',
    profilePicture: 'profile.jpg',
    month : 'Enero',
    day : 1,
    year : 2026
  }
  // Campos del formulario de registro
  showPassword = false;
  confirmPassword = '';
  // Listas para los select de fecha de nacimiento
  months: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  // Generar días del 1 al 31 y años desde 2026 hacia atrás
  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
  years: number[] = Array.from({ length: 57 }, (_, i) => 2026 - i);

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    if(this.authService.isLoggedIn()) {
      this.router.navigate(['/profile']);
    }
  }

  // Alternar la visibilidad de la contraseña
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // Validar que las contraseñas coincidan
  passwordsMatch(): boolean {
    return this.userData.password !== '' && 
           this.confirmPassword !== '' && 
           this.userData.password === this.confirmPassword;
  }

  // funcion para manejar el envio del formulario de registro
  onRegister(event: Event) {
    event.preventDefault(); 

    if (this.passwordsMatch()) {
      const newUser: User = {
        id: crypto.randomUUID(), 
        name: this.userData.name,
        email: this.userData.email,
        password: this.userData.password,
        profilePicture: this.userData.profilePicture,
        birth: `${this.userData.month} ${this.userData.day}, ${this.userData.year}`,
        role: 'user'
      };

      this.userService.createUser(newUser).subscribe({
        next: (response) => {
          console.log('Usuario creado:', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error al crear el usuario:', error);
        }
      });
    }
  }
}
