import { inject, Injectable, signal } from '@angular/core';
import { GameComment } from '../interfaces/gameComment.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class GameCommentService {
  private apiUrl = 'http://localhost:8081/api/gamescomments';
  private http = inject(HttpClient);
  // Simulacion de BD de comentarios
  private _comments = signal<GameComment[]> ([]);

  public comments = this._comments.asReadonly(); 
  private authService = inject(AuthService);

  // Obtener comentarios para un juego específico
  getCommentsForGame(gameId: string) {
    this.http.get<GameComment[]>(`${this.apiUrl}/${gameId}`).subscribe({
      next: (response) => this._comments.set(response),
      error: (err) => console.error('Error al obtener comentarios:', err)
    });
  }

  // Agregar un nuevo comentario
  addComment(comment: GameComment) {
  this.http.post<any>(this.apiUrl, comment, { headers: this.getHeaders() }).subscribe({
    next: (response) => {
      const newComment = this.formatComment(response.comment);
      
      this._comments.update(current => [newComment, ...current]);
    },
    error: (err) => console.error('Error al agregar comentario:', err)
  });
}

  private formatComment(data: any): GameComment {
    return {
      
      gameId: data.gameId || data.game_id || '',
      username: data.username || 'Usuario',
      avatar: data.avatar || 'logo.png',
      date: data.date || new Date(),
      text: data.text || ''
    };
  }

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
  }
}
