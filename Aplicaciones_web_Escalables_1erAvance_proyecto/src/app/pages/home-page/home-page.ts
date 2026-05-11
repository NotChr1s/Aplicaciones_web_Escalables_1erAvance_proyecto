import { Component, inject,} from '@angular/core';
import { Carousel } from "../../components/carousel/carousel";
import { Serach } from "../../components/serach/serach";

import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common'


@Component({
  selector: 'app-root',
  imports: [ Carousel, Serach, CommonModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})

export class HomePage {
  private gameService = inject(GameService);
  public juegosRecomendados = this.gameService.getRecommendedGames();
  public juegosPorLanzar = this.gameService.getUpcomingGames();
}
