import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  constructor(private router: Router) {}

  onLogin(event: Event) {
    event.preventDefault();
    
    console.log(" iniciando sesion...");

    alert("¡Bienvenido!");
    this.router.navigate(['/']); 
  }

}
