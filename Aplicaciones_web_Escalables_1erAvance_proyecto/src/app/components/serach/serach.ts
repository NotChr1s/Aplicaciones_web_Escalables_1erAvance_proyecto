import { Component, inject, signal } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-serach',
  imports: [],
  templateUrl: './serach.html',
  styleUrl: './serach.css',
})
export class Serach {
  // Inyectamos el servicio de juegos y el router
  public gameService = inject(GameService);
  private router = inject(Router);

  // Variable para controlar la visibilidad de los resultados
  showResults = signal(false);

  //metodo para la busqueda
  onSearch(term: string) {
    this.gameService.searchQuery.set(term);
    // solo se muestran resultados si la busqueda tiene mas de 3 caracteres
    this.showResults.set(term.length > 0);
  }

  // metodo para navegar a la pagina del juego seleccionado
  goToGame(gameId: string) {
    this.showResults.set(false); 
    this.router.navigate(['/game/', gameId]);
  }

  // metodo para ocultar los resultados al perder el foco
  hideResults() {
    setTimeout(() => this.showResults.set(false), 200);
  }
}
