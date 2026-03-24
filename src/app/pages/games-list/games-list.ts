import { Component, inject, signal } from '@angular/core';
import { UserGame } from "../../interfaces/userGame.interface";
import { RouterLink} from "@angular/router";
import { GameListService } from '../../services/game-list.service';

@Component({
  selector: 'app-games-list',
  imports: [RouterLink],
  templateUrl: './games-list.html',
  styleUrl: './games-list.css',
})
export class GamesList {
 
  // Inyección de dependencias
  private GameListService = inject(GameListService);
  myGames = signal<UserGame[]>([]);
  activeTab = signal<string>('Todos');
  
  // Se obtiene la lista de juegos del usuario al iniciar el componente
  ngOnInit(): void {
    this.myGames.set(this.GameListService.getListForUser('U0001')); // simulacion de id de usuario
  }

  // funcion para filtrar los juegos segun la pestaña
  get filteredGames() {
    const tab = this.activeTab();
    if (tab === 'Todos') return this.myGames();
    return this.myGames().filter(game => game.status === tab);
  }

  // Cambiar pestaña activa
  setActive(tab: string) {
    this.activeTab.set(tab);
  }
}
