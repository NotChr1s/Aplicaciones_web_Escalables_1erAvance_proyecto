import { Injectable, signal,computed } from '@angular/core';
import { Game } from '../interfaces/game.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  // Simulacion de BD de juegos
  private Games = signal<Game[]>([
    {
      id: 'G0001',
      title: "Assassin's Creed Shadows",
      imageUrl: 'G0001.webp',
      ignScore: 8.0,
      duration: 31,
      genres: ['Acción', 'RPG', 'Mundo Abierto'],
      developers: 'Ubisoft',
      editors: 'Ubisoft',
      platforms: ['PC', 'PS5', 'Xbox Series X/S', 'MAC' ],
      description: 'En Assassins Creed Shadows, elige entre un shinobi o un samurái y explora el mundo abierto del Japón feudal, desde espectaculares ciudades con castillos y puertos bulliciosos hasta apacibles santuarios y paisajes pastorales. Acércate a tus enemigos con tu gancho y tus habilidades de parkour, o carga con brutal precisión y poder para liberar a Japón de sus opresores'
    },
    {
    id: 'G0002',
    title: 'Donkey Kong Country Returns HD',
    imageUrl: 'G0002.jpg',
    ignScore: 8.5,
    duration: 11,
    genres: ['Plataformas'],
    developers: 'Retro Studios, Monster Games',
    editors: 'Nintendo',
    platforms: ['Nintendo Switch'],
    description: 'Ayuda a Donkey Kong y Diddy Kong a recuperar sus valiosas provisiones de plátanos de las garras de la malvada tribu Tiki Tak en esta versión mejorada del juego para la consola Wii™. ¡También puedes aventurarte con un amigo en el modo cooperativo!'
  },
  {
    id: 'G0003',
    title: 'Avowed',
    imageUrl: 'G0003.jpg',
    ignScore: 7.0,
    duration: 20,
    genres: ['RPG'],
    developers: 'Obsidian Entertainment',
    editors: 'Microsoft Game Studios',
    platforms: ['Xbox Series X/S', 'PC'],
    description: 'Avowed contiene violencia realista contra especies inteligentes y criaturas fantásticas. Incluye temas para adultos, referencias a sustancias y un sistema de decisiones que impacta la historia en el mundo de Eora.'
  },
  {
    id: 'G0004',
    title: 'Split Fiction',
    imageUrl: 'G0004.jpg',
    ignScore: 9.0,
    duration: 13,
    genres: ['Acción', 'Aventura'],
    developers: 'Hazelight Studios',
    editors: 'Electronic Arts',
    platforms: ['PS5', 'Nintendo Switch 2', 'Xbox Series X/S', 'PC'],
    description: 'Aventura cooperativa de los creadores de It Takes Two. Mio y Zoe, escritoras opuestas, quedan atrapadas en sus propias historias y deberán trabajar en equipo saltando entre mundos de ciencia ficción y fantasía.'
  },
  {
    id: 'G0005',
    title: 'Xenoblade Chronicles X: Definitive Edition',
    imageUrl: 'G0005.webp',
    ignScore: 9.0,
    duration: 52,
    genres: ['RPG'],
    developers: 'Monolith Software (JP)',
    editors: 'Nintendo',
    platforms: ['Nintendo Switch'],
    description: 'La colosal aventura de ciencia ficción regresa. Explora el planeta Mira y defiéndete utilizando gigantes robots con armas incorporadas en esta edición mejorada visualmente y con nuevos elementos de historia.'
  },
  {
    id: 'G0006',
    title: 'The First Berserker: Khazan',
    imageUrl: 'G0006.avif',
    ignScore: 8.0,
    duration: 39,
    genres: ['RPG', 'Acción', 'Aventura'],
    developers: 'Neople',
    editors: 'Nexon',
    platforms: ['PS5', 'Xbox Series X/S', 'PC'],
    description: 'Vive la brutal acción de Khazan, una aventura RPG ambientada 800 años antes de Dungeon Fighter Online. Domina un sistema de combate profundo mientras enfrentas enemigos implacables en el continente de Arad.'
  },
  {
    id: 'G0007',
    title: 'INZOI',
    imageUrl: 'G0007.webp',
    ignScore: 6.0,
    duration: 50, 
    genres: ['Simulación'],
    developers: 'Krafton',
    editors: 'Krafton',
    platforms: ['PC'],
    description: 'INZOI es un juego de simulación de vida donde los jugadores dan forma al mundo según su visión. Una experiencia inmersiva que busca inspirar a los jugadores a apreciar la vida como un viaje repleto de significado en cada momento.'
  },
  {
    id: 'G0008',
    title: 'DOOM: The Dark Ages',
    imageUrl: 'G0008.jpeg',
    ignScore: 9.0, // Pendiente de lanzamiento
    duration: 0,
    genres: ['Disparos', 'Primera Persona'],
    developers: 'Id Software',
    editors: 'Bethesda Softworks',
    platforms: ['PS5', 'Xbox Series X/S', 'PC'],
    description: 'Precuela de la saga moderna de DOOM. Narra el origen épico de la leyenda del DOOM Slayer en una siniestra guerra medieval contra el infierno nunca antes vista.'
  },
  {
    id: 'G0009',
    title: 'Dune: Awakening',
    imageUrl: 'G0009.avif',
    ignScore: 0, // Pendiente de lanzamiento
    duration: 0,
    genres: ['Supervivencia', 'Mundo Abierto', 'MMO'],
    developers: 'FunCom',
    editors: 'FunCom',
    platforms: ['PS5', 'Xbox Series X/S', 'PC'],
    description: 'MMO de supervivencia en el planeta más peligroso del universo. Sobrevive al desierto, aprende las costumbres Fremen y controla la especia para alcanzar el poder.'
  },
  {
    id: 'G0010',
    title: 'Elden Ring Nightreign',
    imageUrl: 'G0010.avif',
    ignScore: 0, // Pendiente de lanzamiento
    duration: 0,
    genres: ['Acción', 'RPG'],
    developers: 'FromSoftware',
    editors: 'FromSoftware, Bandai Namco',
    platforms: ['PS4', 'Xbox One', 'PS5', 'Xbox Series X/S', 'PC'],
    description: 'Aventura independiente dentro del universo de Elden Ring. Une fuerzas con otros jugadores para enfrentarte a los peligros de la noche acechante.'
  },
  {
    id: 'G0011',
    title: 'Death Stranding 2: On The Beach',
    imageUrl: 'G0011.avif',
    ignScore: 0, // Pendiente de lanzamiento
    duration: 0,
    genres: ['Acción', 'Aventura', 'Mundo Abierto'],
    developers: 'Kojima Productions',
    editors: 'Sony Interactive Entertainment',
    platforms: ['PS5'],
    description: 'Secuela del aclamado juego de Hideo Kojima. Sigue a Fragile y Sam Bridges muchos años después de los eventos del título original en una nueva odisea de conexión.'
  },
  {
    id: 'G0012',
    title: 'Borderlands 4',
    imageUrl: 'G0012.jpg',
    ignScore: 0,
    duration: 0,
    genres: ['Acción', 'RPG', 'Disparos', 'Mundo Abierto'],
    developers: 'Gearbox Software',
    editors: '2K Games, Take-Two Interactive',
    platforms: ['PS5', 'Xbox Series X/S', 'Nintendo Switch 2', 'PC'],
    description: 'Shooter de saqueo y caos con miles de millones de armas y enemigos atroces. Escápate de un peligroso planeta oculto como uno de los cuatro nuevos buscacámaras en esta intensa experiencia cooperativa.'
  },
  {
    id: 'G0013',
    title: 'Hollow Knight: Silksong',
    imageUrl: 'G0013.jpg',
    ignScore: 0,
    duration: 0,
    genres: ['Acción', 'Aventura'],
    developers: 'Team Cherry',
    editors: 'Team Cherry',
    platforms: ['PS4', 'PS5', 'Nintendo Switch', 'Xbox Series X/S', 'PC'],
    description: 'Épica secuela del galardonado juego de acción y aventuras. Encarna a Hornet, la letal princesa cazadora, mientras viajas a nuevas tierras, descubres nuevos poderes y luchas contra hordas de bichos y bestias.'
  },
  {
    id: 'G0014',
    title: 'Pokémon Legends: Z-A',
    imageUrl: 'G0014.jpg',
    ignScore: 0,
    duration: 0,
    genres: ['Acción', 'RPG'],
    developers: 'Game Freak',
    editors: 'Nintendo, The Pokémon Company',
    platforms: ['Nintendo Switch', 'Nintendo Switch 2'],
    description: 'Aventura ambientada en Ciudad Luminalia, donde se lleva a cabo un plan de reurbanización para que humanos y Pokémon coexistan. Descubre una ciudad más verde y vanguardista en este nuevo capítulo de la saga Legends.'
  },
  {
    id: 'G0015',
    title: 'Metal Gear Solid Delta: Snake Eater',
    imageUrl: 'G0015.webp',
    ignScore: 0,
    duration: 0,
    genres: ['Acción', 'Aventura', 'Sigilo'],
    developers: 'Konami JPN (KCEJ), Virtuos Games',
    editors: 'Konami',
    platforms: ['PS5', 'Xbox Series X/S', 'PC'],
    description: 'Remake del clásico de 2004. Vive la historia apasionante de Snake con gráficos de nueva generación y audio 3D. Prepárate para la experiencia definitiva de acción, sigilo y supervivencia en la jungla.'
  },
  {
    id: 'G0016',
    title: 'Super Mario 64',
    imageUrl: 'G0016.jpg', 
    ignScore: 9.8,
    duration: 12,
    genres: ['Plataformas'],
    developers: 'Nintendo EAD',
    editors: 'Nintendo',
    platforms: ['Nintendo 64', 'Wii', 'Wii U', 'Nintendo Switch'],
    description: 'El primer videojuego en 3D de la serie Super Mario que revolucionó el diseño de niveles y el control analógico. Un clásico atemporal donde Mario explora el castillo de Peach para rescatarla de Bowser.'
  },
  {
    id: 'G0017',
    title: "Assassin's Creed 2",
    imageUrl: 'G0017.jpg',
    ignScore: 9.2,
    duration: 20,
    genres: ['Acción', 'Aventura', 'Mundo Abierto'],
    developers: 'Ubisoft Montreal',
    editors: 'Ubisoft',
    platforms: ['Xbox 360', 'PS3', 'PC', 'Mac'],
    description: 'La épica historia de Ezio Auditore da Firenze en el Renacimiento italiano. Una historia de venganza y conspiraciones donde Ezio recorrerá Florencia y Venecia hasta convertirse en un Maestro Assassin.'
  },
  {
    id: 'G0018',
    title: 'The Witcher 3: Wild Hunt',
    imageUrl: 'G0018.avif',
    ignScore: 9.3,
    duration: 52,
    genres: ['RPG'],
    developers: 'CD Projekt Red',
    editors: 'Bandai Namco, Warner Bros, CD Projekt',
    platforms: ['Xbox One', 'PS4', 'PS5', 'Xbox Series X/S', 'Nintendo Switch', 'PC'],
    description: 'Una combinación única de historia no lineal y mundo abierto. Centrado en las elecciones del jugador, combate táctico y un entorno vivo y rico. Sigue a Geralt de Rivia en su búsqueda de Ciri.'
  }
  ]);

  public allGames = this.Games.asReadonly();

  constructor() {}

  // Obtener todos los juegos
  getGames(){
    return this.allGames();
  }
  
  // Obtener un solo juego por ID 
  getGameById(id: string | null) {
    return computed(() => this.allGames().find(g => g.id === id));
  }

  // Obtener juegos recomendados (con calificacion IGN  > 0)
  getRecommendedGames() {
    return computed(() => this.allGames().filter(g => g.ignScore > 0));
  }

  // Obtener juegos próximos a lanzarse (con calificacion IGN = 0)
  getUpcomingGames() {
    return computed(() => this.allGames().filter(g => g.ignScore === 0));
  }
}
