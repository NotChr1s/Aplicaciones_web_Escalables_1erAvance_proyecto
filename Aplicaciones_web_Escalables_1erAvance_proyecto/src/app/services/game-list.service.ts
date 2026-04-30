import { Injectable, signal } from '@angular/core';
import { UserGame } from '../interfaces/userGame.interface';

@Injectable({
  providedIn: 'root',
})
export class GameListService {
  // Simulacion de BD de juegos en la lista del usuario
  private _list = signal<UserGame[]>([
    { id: 'G0001', userId: 'U0001', gameId: 'G0001', name: "Assassin's Creed Shadows", image: 'G0001.webp', score: 8, status: 'Jugando' },
    { id: 'G0002', userId: 'U0001', gameId: 'G0003', name: "Avowed", image: 'G0003.jpg', score: 6, status: 'Por jugar' },
    { id: 'G0003', userId: 'U0001', gameId: 'G0007', name: "INZOI", image: 'G0007.webp', score: 8, status: 'Finalizado' },
    { id: 'G0004', userId: 'U0001', gameId: 'G0016', name: "Super Mario 64", image: 'G0016.jpg', score: 10, status: 'Finalizado' },
    { id: 'G0005', userId: 'U0001', gameId: 'G0017', name: "Assassin's Creed 2", image: 'G0017.jpg', score: 10, status: 'Finalizado' },
    { id: 'G0006', userId: 'U0001', gameId: 'G0018', name: "The Witcher 3: Wild Hunt", image: 'G0018.avif', score: 9, status: 'Abandonado' },
  ]);

  public list = this._list.asReadonly();

  // Obtener la lista de juegos para un usuario específico
  getListForUser(userId: string) {
    return this.list().filter(game => game.userId === userId);
  }
  
  // Agregar un juego a la lista del usuario
  addGameToList(game: UserGame) {
    this._list.update(games => [...games, game]);
  }

  // Eliminar un juego de la lista del usuario
  removeGameFromList(gameId: string) {
    this._list.update(games => games.filter(game => game.id !== gameId));
  }

  // Verificar si un juego ya está en la lista del usuario
  isInList(gameId: string) {
    return this.list().some(game => game.gameId === gameId);
  }
}
