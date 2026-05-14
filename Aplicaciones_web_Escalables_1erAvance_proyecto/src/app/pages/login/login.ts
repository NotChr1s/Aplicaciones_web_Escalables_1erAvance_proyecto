import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  private fb = inject(FormBuilder);
  public authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.group({
    name: ['', Validators.required],
    password: ['', Validators.required]
  });

  onLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.name!, this.loginForm.value.password!);
    }
  }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()) {
      this.router.navigate(['/profile']);
    }
  }
}
