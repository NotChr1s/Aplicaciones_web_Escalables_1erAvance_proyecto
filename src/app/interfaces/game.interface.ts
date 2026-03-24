export interface Game {
  id: string;     
  title: string;   
  imageUrl: string; 
  ignScore: number;
  duration: number;
  genres: string[];
  developers: string;
  editors: string;
  platforms: string[];
  description: string;
}