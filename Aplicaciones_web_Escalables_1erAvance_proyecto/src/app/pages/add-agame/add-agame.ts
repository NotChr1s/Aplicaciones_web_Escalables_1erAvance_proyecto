import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service'; 
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-game',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-agame.html',
  styleUrl: './add-agame.css',
})
export class AddGame implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private gameService = inject(GameService);
  private authService = inject(AuthService);

  // Listas para los checkboxes
  genresList = ['Acción', 'Aventura', 'RPG', 'Estrategia', 'Mundo abierto', 'Deportes', 'Simulación', 'Terror', 'Multijugador'];
  platformsList = ['PC', 'PS5', 'Xbox Series X/S', 'Switch', 'PS4'];

  // Definición del Formulario
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
  imagePreview: string | ArrayBuffer | null = 'add_game.jpg';

  // Getters para los FormArrays
  get genresArray() { return this.gameForm.get('genres') as FormArray; }
  get platformsArray() { return this.gameForm.get('platforms') as FormArray; }

  ngOnInit(): void {
    if(!this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
    if(this.authService.currentUser()?.role !== 'admin') {
      this.router.navigate(['/home']);
    }
  }

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

    const gameData = {
      title: title!,
      duration: duration!,
      genres: genres!, 
      developers: developers!,
      editors: editors!,
      platforms: platforms!,
      description: description!,
      ignScore: ignScore!,
      imageUrl: imageImage! 
    };

    // Llamada al servicio 
    this.gameService.createGame(gameData).subscribe({
      next: () => {
        alert('Juego creado exitosamente');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Error al crear:', err);
        alert('Hubo un error al guardar el juego.');
      }
    });
  }
}