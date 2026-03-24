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

export class HomePage implements OnInit {
  private gameService = inject(GameService);
  juegosRecomendados = signal<Game[]>([]);
  juegosPorLanzar = signal<Game[]>([]);

  // Se obtienen los juegos recomendados y los próximos lanzamientos al iniciar el componente
  ngOnInit(): void {
    this.juegosRecomendados.set(this.gameService.getRecommendedGames()());
    this.juegosPorLanzar.set(this.gameService.getUpcomingGames()());
  }
}
