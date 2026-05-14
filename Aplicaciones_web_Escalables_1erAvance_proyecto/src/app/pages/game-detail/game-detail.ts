import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameComment } from "../../interfaces/gameComment.interface";
import { GameService } from '../../services/game.service';
import { GameCommentService } from '../../services/game-comment.service';
import { GameListService } from '../../services/game-list.service';
import { UserGame } from '../../interfaces/userGame.interface';
import { AuthService } from '../../services/auth.service';
import { find } from 'rxjs';

@Component({
  selector: 'app-game-detail',
  imports: [CommonModule, FormsModule],
  templateUrl: './game-detail.html',
  styleUrl: './game-detail.css',
})
export class GameDetail {
  // Inyecccion de dependencias
  private route = inject(ActivatedRoute);//Para obtener el ID del juego desde la URL
  private gameService = inject(GameService);//Para obtener los detalles del juego
  public GameCommentService = inject(GameCommentService);// Para manejar los comentarios del juego
  private GameListService = inject(GameListService);// Para manejar la lista de juegos del usuario (agregar o quitar)
  public authService = inject(AuthService);// Para manejar la autenticacion del usuario (simulada en este caso)
  private router = inject(Router);// Para redirigir al usuario a la pagina de login si no esta autenticado

  // Variables de estado
  private gameId = this.route.snapshot.paramMap.get('id');
  newCommentText: string = '';
  game = computed(() => {
    return this.gameService.games().find(g => g.id.toString() === this.gameId);
  });

  // Computed para verificar si el juego ya está en la lista del usuario
  isAdded = computed(() => {
    const currentGame = this.game();// Obtenemos el juego actual
    if (!currentGame) return false;

   return this.GameListService.list().some(g => String(g.gameId) === String(currentGame.id));// Verificamos si el juego actual está en la lista de juegos del usuario
  })

  ngOnInit(): void {
    this.GameCommentService.getCommentsForGame(this.gameId!);// Obtenemos los comentarios para el juego actual al cargar la página
  }

  // funcion para publicar un nuevo comentario
  postComment(event: Event) {
    event.preventDefault();

    if (this.newCommentText.trim() === '' || !this.gameId) return;

    if (this.newCommentText.trim() === '') return;//Validacion para evitar comentarios vacios

    const comment: GameComment = {
      gameId: this.gameId, // ID del juego actual
      username: this.authService.currentUser()?.name || 'Usuario', // Usuario actual simulado
      avatar: this.authService.currentUser()?.profilePicture || 'logo.png',// imagen de perfil simulada
      date: new Date().toISOString(), // Fecha actual
      text: this.newCommentText // El texto del nuevo comentario
    };

    console.log('Nuevo comentario:', comment); // Verifica que el comentario se ha creado correctamente

    this.GameCommentService.addComment(comment);//Añade el comentario atraves del servicio
    //Actualizamos la lista de comentarios para ver el nuevo comentario agregado
    this.newCommentText = ''; // Limpia el input

  }

  // Función para el botón Añadir
  addToList() {
    const currentGame = this.game();
    if (!currentGame) return;
    // Creamos un objeto UserGame con los detalles del juego actual para agregarlo a la lista del usuario
    const userGame: UserGame = {
      id: crypto.randomUUID(), 
      userId: this.authService.currentUser()?.id || 'U0001',
      gameId: currentGame.id,
      name: currentGame.title,
      image: currentGame.imageUrl,
      score: 0,
      status: 'Por jugar'
    }

    // Agregamos el juego a la lista del usuario a traves del servicio
    this.GameListService.addGameToList(userGame);
  }

  // Función para el botón Quitar
  removeFromList() {
    const currentGame = this.game();
    if (!currentGame) return;
    this.GameListService.removeGameFromList(currentGame.id);
  }

  notLoggedIn() {
    this.router.navigate(['/login']);
  }

  currentStatus = computed(() => {
    const currentGame = this.game();
    if (!currentGame) return 'plantoplay';

    const userGame = this.findUserGame();

    if (userGame){
      switch (userGame.status) {
        case 'Por jugar':
          return 'plantoplay';
        case 'Jugando':
          return 'playing';
        case 'Finalizado':
          return 'completed';
        case 'Abandonado':
          return 'dropped';
        default:
          return userGame.status;
      }
    }else{
      return 'plantoplay';
    }
  });

  updateStatus(newStatus: string) {
    const statusTyped = newStatus as "Por jugar" | "Jugando" | "Finalizado" | "Abandonado";
    const userGame = this.findUserGame();

    if (!userGame) return;

    // mandamos el campo especifico de status y el campo que se va a actualiar
    this.GameListService.updateGameFields(userGame.id, { status: statusTyped });
  }

  currentStatusScore = computed(() => {
    const userGame = this.findUserGame();

    return userGame ? userGame.score : 0;
  });

  updateStatusScore(newScore: string) {
    const scoreTyped = parseInt(newScore);
    const userGame = this.findUserGame();

    if (!userGame) return;
    console.log(userGame.id, scoreTyped);

    // mandamos el campo especifico de score y el campo que se va a actualiar junto con el id del juego en la lista del usuario
    this.GameListService.updateGameFields(userGame.id, { score: scoreTyped});
  }

  findUserGame() {
    const currentGame = this.game();
    if (!currentGame) return 0;

    const userGame = this.GameListService.list().find(
      g => String(g.gameId) === String(currentGame.id)
    );
    return userGame;
  }
}
