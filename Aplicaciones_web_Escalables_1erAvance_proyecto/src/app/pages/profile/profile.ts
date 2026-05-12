import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth.service';
import { SafeImgPipe } from '../../pipes/safe-img-pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [RouterLink, SafeImgPipe, CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
 public authService = inject(AuthService);
 public user = this.authService.currentUser;
}
