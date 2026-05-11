import { Component, inject } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";
import { NgClass } from '@angular/common';
import { filter } from 'rxjs/internal/operators/filter';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [NgClass],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  isTransparent: boolean = false;
  public authService = inject(AuthService);

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.isTransparent = event.url === '/' || event.url === '/home';
    });
  }
}
