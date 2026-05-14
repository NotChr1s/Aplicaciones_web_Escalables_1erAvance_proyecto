import { Component, inject, signal } from '@angular/core';
import { UserGame } from "../../interfaces/userGame.interface";
import { Router, RouterLink} from "@angular/router";
import { GameListService } from '../../services/game-list.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-games-list',
  imports: [RouterLink],
  templateUrl: './games-list.html',
  styleUrl: './games-list.css',
})
export class GamesList {
  private GameListService = inject(GameListService);
  private router = inject(Router);
  activeTab = signal<string>('Todos');
  private authService = inject(AuthService);
  
  ngOnInit(): void {
    if(!this.authService.isLoggedIn()){
      this.router.navigate(['/login']);
    }
  }

  // funcion para filtrar los juegos segun la pestaña
  get filteredGames() {
    const tab = this.activeTab();
    if (tab === 'Todos') return this.GameListService.list();
    return this.GameListService.list().filter(game => game.status === tab);
  }

  // Cambiar pestaña activa
  setActive(tab: string) {
    this.activeTab.set(tab);
  }
}
