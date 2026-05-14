import { Injectable, signal,computed, inject } from '@angular/core';
import { Game } from '../interfaces/game.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  //atributos
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8081/api/games';
  private authService = inject(AuthService);
  private _games = signal<Game[]>([]);
  public games = this._games.asReadonly();
  public searchQuery = signal<string>('');

  // Computed para filtrar juegos según la búsqueda del usuario
  public filteredGames = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return this.games();

    return this.games().filter(game => 
      game.title.toLowerCase().includes(query) || 
      game.genres.some(g => g.toLowerCase().includes(query))
    );
  });

  //obtener juegos recomendados
  getRecommendedGames() {
    return computed(() => {
      // Filtramos los juegos que tienen una puntuación IGN mayor a 0 (asumiendo que los juegos con puntuación 0 son los próximos lanzamientos)
      const filtered = this.games().filter(g => g.ignScore > 0);
      return this.getRandomItems(filtered, 7);
    });
  }

  // Obtener próximos lanzamientos (juegos con IGN Score 0)
  getUpcomingGames() {
    return computed(() => {
      const filtered = this.games().filter(g => g.ignScore === 0);
      return this.getRandomItems(filtered, 7);
    });
  }

  // Función auxiliar para obtener una cantidad específica de elementos aleatorios de un array
  private getRandomItems(array: any[], count: number) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  constructor() {
    this.fetchGames();
  }

  // Función para obtener la lista completa de juegos desde el backend
  fetchGames(): void {
    this.http.get<Game[]>(this.apiUrl).subscribe({
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

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
  }

  createGame(gameData: any) {
    return this.http.post(this.apiUrl, gameData, { headers: this.getHeaders() });
  }

}
