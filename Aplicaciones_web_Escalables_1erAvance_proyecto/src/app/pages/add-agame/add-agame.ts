import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service'; // Asegúrate de tener este servicio

@Component({
  selector: 'app-add-game',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-agame.html',
  styleUrl: './add-agame.css',
})
export class AddGame {
  // Inyectamos los servicios necesarios
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private gameService = inject(GameService);

  // Listas para los checkboxes
  genresList = ['Acción', 'Aventura', 'RPG', 'Estrategia', 'Mundo abierto', 'Deportes', 'Simulación', 'Terror', 'Multijugador'];
  platformsList = ['PC', 'PS5', 'Xbox Series X/S', 'Switch', 'PS4'];

  // Definición del Formulario siguiendo tu estilo
  gameForm = this.fb.group({
    title: ['', [Validators.required]],
    duration: [0, [Validators.required, Validators.min(1)]],
    genres: this.fb.array([], [Validators.required]),
    developers: ['', [Validators.required]],
    editors: ['', [Validators.required]],
    platforms: this.fb.array([], [Validators.required]),
    description: ['', [Validators.required]],
    ignScore: [5, [Validators.required, Validators.min(1), Validators.max(10)]],
    imageImage: [''] // Aquí irá el Base64
  });

  // Variable para la previsualización
  imagePreview: string | ArrayBuffer | null = 'logo.png';

  // Getters para los FormArrays (indispensables para los checkboxes)
  get genresArray() { return this.gameForm.get('genres') as FormArray; }
  get platformsArray() { return this.gameForm.get('platforms') as FormArray; }

  // Misma lógica de archivos que usaste en ProfileManagement
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        // Sincronizamos el Base64 con el formulario
        this.gameForm.patchValue({ imageImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  }

  // Manejo de checkboxes para géneros y plataformas
  onCheckChange(event: any, array: FormArray, value: string) {
    if (event.target.checked) {
      array.push(new FormControl(value));
    } else {
      const index = array.controls.findIndex(x => x.value === value);
      array.removeAt(index);
    }
  }

  saveGame() {
    if (this.gameForm.invalid) {
      alert('Por favor, llena todos los campos obligatorios.');
      return;
    }

    // Extraemos los valores del formulario
    const { title, duration, genres, developers, editors, platforms, description, ignScore, imageImage } = this.gameForm.value;

    // Construimos el objeto final (Metodología idéntica a updatedData de tu perfil)
    const gameData = {
      title: title!,
      duration: duration!,
      genres: genres!, // Ya es un arreglo por el FormArray
      developers: developers!,
      editors: editors!,
      platforms: platforms!, // Ya es un arreglo por el FormArray
      description: description!,
      ignScore: ignScore!,
      imageUrl: imageImage! // Enviamos el string Base64
    };

    // Llamada al servicio (Igual que userService.updateUser)
    this.gameService.createGame(gameData).subscribe({
      next: () => {
        alert('¡Videojuego creado con éxito!');
      },
      error: (err) => {
        console.error('Error al crear:', err);
        alert('Hubo un error al guardar el juego.');
      }
    });
  }
}