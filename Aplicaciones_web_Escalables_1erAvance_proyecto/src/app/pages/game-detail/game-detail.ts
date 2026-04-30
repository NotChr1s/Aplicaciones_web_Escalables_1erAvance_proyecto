import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameComment } from "../../interfaces/gameComment.interface";
import { GameService } from '../../services/game.service';
import { GameCommentService } from '../../services/game-comment.service';
import { GameListService } from '../../services/game-list.service';
import { UserGame } from '../../interfaces/userGame.interface';

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
  private GameCommentService = inject(GameCommentService);// Para manejar los comentarios del juego
  private GameListService = inject(GameListService);// Para manejar la lista de juegos del usuario (agregar o quitar)

  // Variables de estado
  private gameId = this.route.snapshot.paramMap.get('id');
  newCommentText: string = '';
  game = computed(() => {
    return this.gameService.games().find(g => g.id.toString() === this.gameId);
  });


  comments = signal<GameComment[]>([]);
  myGames = signal<UserGame[]>([]);
  
  // Computed para verificar si el juego ya está en la lista del usuario
  isAdded = computed(() => {
    const currentGame = this.game();// Obtenemos el juego actual
    return currentGame ? this.myGames().some(g => g.gameId === currentGame.id) : false;// Verificamos si el juego actual está en la lista de juegos del usuario
  })

  ngOnInit(): void {
    this.myGames.set(this.GameListService.getListForUser('U0001')); // simulacion de id de usuario => U0001
    
    // se busca el juego por ID desde el servicio
    if (this.gameId) {
      this.comments.set(this.GameCommentService.getCommentsForGame(this.gameId));
    };
  }

  // funcion para publicar un nuevo comentario
  postComment(event: Event) {
    event.preventDefault();

    if (this.newCommentText.trim() === '' || !this.gameId) return;

    if (this.newCommentText.trim() === '') return;//Validacion para evitar comentarios vacios

    const comment: GameComment = {
      user_id: 'U0003', // ID de usuario simulado
      game_id: this.gameId, // ID del juego actual
      username: 'Israel', // Usuario actual simulado
      avatar: 'profile.jpg',// imagen de perfil simulada
      date: new Date(),// Fecha actual
      text: this.newCommentText // El texto del nuevo comentario
    };

    console.log('Nuevo comentario:', comment); // Verifica que el comentario se ha creado correctamente

    this.GameCommentService.addComment(comment);//Añade el comentario atraves del servicio

    //Actualizamos la lista de comentarios para ver el nuevo comentario agregado
    const updatedComments = this.GameCommentService.getCommentsForGame(this.gameId);
    this.comments.set(updatedComments);
    this.newCommentText = ''; // Limpia el input

  }

  // Función para el botón Añadir
  addToList() {
    const currentGame = this.game();
    if (!currentGame) return;
    // Creamos un objeto UserGame con los detalles del juego actual para agregarlo a la lista del usuario
    const userGame: UserGame = {
      id: currentGame.id,
      userId: 'U0001',
      gameId: currentGame.id,
      name: currentGame.title,
      image: currentGame.imageUrl,
      score: 0,
      status: 'Por jugar'
    }

    // Agregamos el juego a la lista del usuario a traves del servicio
    this.GameListService.addGameToList(userGame);
    this.updateMyGames();
  }

  // Función para el botón Quitar
  removeFromList() {
    const currentGame = this.game();
    if (!currentGame) return;
    this.GameListService.removeGameFromList(currentGame.id);
    this.updateMyGames();
  }

  // funcion para actualizar la lista de juegos del usuario despues de agregar o quitar un juego
  updateMyGames() {
    this.myGames.set(this.GameListService.getListForUser('U0001'));
  }
}
