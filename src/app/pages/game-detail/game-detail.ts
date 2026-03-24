import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameComment } from "../../interfaces/gameComment.interface";
import { Game } from '../../interfaces/game.interface';
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
  newCommentText: string = '';
  game = signal<any>(null);
  comments = signal<GameComment[]>([]);
  myGames = signal<UserGame[]>([]);
  
  // Computed para verificar si el juego ya está en la lista del usuario
  isAdded = computed(() => {
    const currentGame = this.game();// Obtenemos el juego actual
    return currentGame ? this.myGames().some(g => g.gameId === currentGame.id) : false;// Verificamos si el juego actual está en la lista de juegos del usuario
  })

  ngOnInit(): void {
    //Se obtiene el ID de la ruta
    const id = this.route.snapshot.paramMap.get('id');
    this.myGames.set(this.GameListService.getListForUser('U0001')); // simulacion de id de usuario => U0001
    
    // se busca el juego por ID desde el servicio
    if (id) {
      const foundGame = this.gameService.allGames().find(g => g.id === id);
      this.game.set(foundGame);
      this.comments.set(this.GameCommentService.getCommentsForGame(id));
    };
  }

  // funcion para publicar un nuevo comentario
  postComment(event: Event) {
    event.preventDefault();

    if (this.newCommentText.trim() === '') return;//Validacion para evitar comentarios vacios

    const comment: GameComment = {
      user_id: 'U0003', // ID de usuario simulado
      game_id: this.game().id, // ID del juego actual
      username: 'Israel', // Usuario actual simulado
      avatar: 'profile.jpg',// imagen de perfil simulada
      date: new Date(),// Fecha actual
      text: this.newCommentText // El texto del nuevo comentario
    };

    console.log('Nuevo comentario:', comment); // Verifica que el comentario se ha creado correctamente

    this.GameCommentService.addComment(comment);//Añade el comentario atraves del servicio

    //Actualizamos la lista de comentarios para ver el nuevo comentario agregado
    const updatedComments = this.GameCommentService.getCommentsForGame(this.game().id);
    this.comments.set(updatedComments);
    this.newCommentText = ''; // Limpia el input

  }

  // Función para el botón Añadir
  addToList() {
    // Creamos un objeto UserGame con los detalles del juego actual para agregarlo a la lista del usuario
    const userGame: UserGame = {
      id: this.game().id,
      userId: 'U0001',
      gameId: this.game().id,
      name: this.game().name,
      image: this.game().image,
      score: 0,
      status: 'Por jugar'
    }

    // Agregamos el juego a la lista del usuario a traves del servicio
    this.GameListService.addGameToList(userGame);
    this.updateMyGames();
  }

  // Función para el botón Quitar
  removeFromList() {
    this.GameListService.removeGameFromList(this.game().id);
    this.updateMyGames();
  }

  // funcion para actualizar la lista de juegos del usuario despues de agregar o quitar un juego
  updateMyGames() {
    this.myGames.set(this.GameListService.getListForUser('U0001'));
  }
}
