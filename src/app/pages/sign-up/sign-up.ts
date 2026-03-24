import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  imports: [FormsModule, CommonModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
  // Campos del formulario de registro
  showPassword = false;
  password = '';
  confirmPassword = '';
  // Listas para los select de fecha de nacimiento
  months: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  // Generar días del 1 al 31 y años desde 2026 hacia atrás
  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
  years: number[] = Array.from({ length: 57 }, (_, i) => 2026 - i);

  constructor(private router: Router) {}

  // Alternar la visibilidad de la contraseña
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // Validar que las contraseñas coincidan
  passwordsMatch(): boolean {
    return this.password !== '' && 
           this.confirmPassword !== '' && 
           this.password === this.confirmPassword;
  }

  // funcion para manejar el envio del formulario de registro
  onRegister(event: Event) {
    event.preventDefault(); 

    console.log('Formulario enviado con exito');
    
    alert('¡Te has registrado con exito!');
    
    this.router.navigate(['/login']);
  }
}
