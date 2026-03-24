import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../../interfaces/game.interface'; // Asegúrate de ajustar la ruta

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.html',
  styleUrls: ['./carousel.css']
})
export class Carousel implements OnInit {

  //Se recibe la lista de juegos desde el padre
  @Input() games: Game[] = [];
  
  // Variables para controlar el estado del carrusel
  currentIndex: number = 0;       // indice actual
  itemWidth: number = 320;        // Ancho de cada .module + margin (aprox 300+20)
  itemsToShow: number = 5;        // cantidad de juegos para mostrar a la vez
  translateX: number = 0;         // El valor del transform CSS

  constructor() { }

  ngOnInit(): void {
    
  }

  // Logica hecha para el boton de flacha "siguiente"
  nextSlide() {
    const totalItems = this.games.length;
    
    // Si no hemos llegado al final de la lista (menos los que mostramos)
    if (this.currentIndex < totalItems - this.itemsToShow) {
      this.currentIndex++;
      this.updateCarousel();
    }
  }

  // Logica hecha para el boton de flacha "anterior"
  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateCarousel();
    }
  }

  // funcion para calcular el movimiento de CSS
  updateCarousel() {
    this.translateX = -(this.currentIndex * this.itemWidth);
  }
}