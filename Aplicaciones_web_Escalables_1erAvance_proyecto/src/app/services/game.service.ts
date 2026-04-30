import { Injectable, signal,computed, inject } from '@angular/core';
import { Game } from '../interfaces/game.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private http = inject(HttpClient);

  private _games = signal<Game[]>([]);

  public games = this._games.asReadonly();

  getRecommendedGames() {
  return computed(() => this.games().filter(g => g.ignScore > 0));
}

getUpcomingGames() {
  return computed(() => this.games().filter(g => g.ignScore === 0));
}

  constructor() {
    this.fetchGames();
  }

  fetchGames(): void {
    this.http.get<Game[]>('http://localhost:8081/api/games').subscribe({
      next: (response: Game[]) => {
        this._games.set(response);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  // Obtener un solo juego por ID 
  getGameById(id: string | number | null) {
    return computed(() => {
      if (!id) return null;
      return this.games().find(g => g.id.toString() === id.toString());
    });
  }
}
