import { inject, Injectable, signal } from '@angular/core';
import { UserGame } from '../interfaces/userGame.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class GameListService {
  private http = inject(HttpClient);

  private _list = signal<UserGame[]>([]);

  public list = this._list.asReadonly();

  private authService = inject(AuthService);
  private apiUrl = 'http://localhost:8081/api/gameslist';

  constructor() {
    if(this.authService.isLoggedIn()){
      const userId = this.authService.currentUser()?.id;
      if(userId){
        this.getListForUser(userId); 
      }
    }
  }

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
  }

  // Obtener la lista de juegos 
  getListForUser(userId: string) {
    this.http.get<UserGame[]>(`${this.apiUrl}/${userId}`, { headers: this.getHeaders() })
      .subscribe({
        next: (response) => this._list.set(response),
        error: (err) => console.error('Error al obtener lista:', err)
    });
  }
  
  // Agregar un juego a la lista del usuario
  addGameToList(game: UserGame) {
    this.http.post<UserGame>(this.apiUrl, game, { headers: this.getHeaders() }).subscribe({
      next: (response) => {
        const gameToSave = {
          ...response,
          gameId: String(response.gameId || game.gameId) 
        };

        this._list.update(games => [...games, gameToSave]);
      },
      error: (error) => console.log('Error al agregar:', error)
    });
  }

  // Eliminar un juego de la lista del usuario
  removeGameFromList(gameId: string) {
    this.http.delete(`${this.apiUrl}/${gameId}`, { headers: this.getHeaders() }).subscribe({
      next: () => {
        this._list.update(games => games.filter(g => String(g.gameId) !== String(gameId)));
      },
      error: (error) => console.log('Error al eliminar:', error)
    });
  }

  // Verificar si un juego ya está en la lista del usuario
  isInList(gameId: string) {
    return this.list().some(game => game.gameId === gameId);
  }

  updateGameInList(updatedGame: UserGame) {
    this.http.put<UserGame>(this.apiUrl, updatedGame, { headers: this.getHeaders() }).subscribe({
      next: (response) => {
        const gameToSave = {
          ...response,
          gameId: String(response.gameId || updatedGame.gameId) 
        };

        this._list.update(games => [...games, gameToSave]);
      },
      error: (error) => console.log('Error al agregar:', error)
    });
  }

}
