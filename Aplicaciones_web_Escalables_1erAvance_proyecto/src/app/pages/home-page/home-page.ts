import { Component, inject, Inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "../../components/navbar/navbar";
import { Carousel } from "../../components/carousel/carousel";
import { Footer } from "../../components/footer/footer";
import { Serach } from "../../components/serach/serach";
import { Game } from '../../interfaces/game.interface';
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
