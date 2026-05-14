import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth.service';
import { SafeImgPipe } from '../../pipes/safe-img-pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [RouterLink, SafeImgPipe, CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
 public authService = inject(AuthService);
 public user = this.authService.currentUser;
 private router = inject(Router);

 ngOnInit(): void {
    if(!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }
}
