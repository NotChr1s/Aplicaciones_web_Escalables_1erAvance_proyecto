export interface UserGame {
  id: string;
  userId: string;
  gameId: string;
  name: string;
  image: string;
  score: number;
  status: 'Jugando' | 'Finalizado' | 'Abandonado' | 'Por jugar';
}