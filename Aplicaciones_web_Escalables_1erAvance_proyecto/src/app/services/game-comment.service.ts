import { Injectable, signal } from '@angular/core';
import { GameComment } from '../interfaces/gameComment.interface';

@Injectable({
  providedIn: 'root',
})
export class GameCommentService {
  // Simulacion de BD de comentarios
  private _comments = signal<GameComment[]> ([
      {
      user_id: 'U0001',
      game_id: 'G0001',
      username: 'ShadowSlayer99',
      avatar: 'profile.jpg', // Reutiliza tu imagen de perfil por ahora
      date: new Date('2026-03-20T10:30:00'),
      text: '¡El sigilo en este juego se ve increíble! Me encanta la dualidad shinobi/samurái.'
    },
    {
      user_id: 'U0002',
      game_id: 'G0001',
      username: 'GamerGurl_ISI',
      avatar: 'profile.jpg',
      date: new Date('2026-03-21T08:15:00'),
      text: 'La recreación de Kioto es espectacular. Ojalá la duración sea mayor a 31 horas.'
    }
  ]);

  public comments = this._comments.asReadonly(); 

  // Obtener comentarios para un juego específico
  getCommentsForGame(gameId: string) {
    return this.comments().filter(comment => comment.game_id === gameId);
  }

  // Agregar un nuevo comentario
  addComment(comment: GameComment) {
    this._comments.update(comments => [...comments, comment]);
  }
}
