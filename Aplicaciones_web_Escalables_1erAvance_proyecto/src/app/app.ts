import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./components/navbar/navbar";
import { Carousel } from "./components/carousel/carousel";
import { Footer } from "./components/footer/footer";
import { Serach } from "./components/serach/serach";
import { Game } from './interfaces/game.interface';
import { Content } from "./components/content/content";

@Component({
  selector: 'app-root',
  imports: [ Navbar, Footer, Content],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('MyGamingList');

}
