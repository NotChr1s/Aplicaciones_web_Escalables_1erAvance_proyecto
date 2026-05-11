import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user.interface';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private _token = signal<string | null>(localStorage.getItem('token'));

  private _currentUser = signal<User | null>(this.decodeAndGetUser());
  
  public currentUser = computed(() => this._currentUser());
  public isLoggedIn = computed(() => !!this._token());
  public isLoading = signal(false);
  public errorMessage = signal<string | null>(null);

  getToken() {
    return this._token();
  }

  login(name: string, password: string) {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    return this.http.post<any>('http://localhost:8081/api/auth/login', { name, password }).subscribe({
      next: (response: any) => {
        const token = response.token;
        this._token.set(token);
        localStorage.setItem('token', token);

        const user: User = response.user; 
        this._currentUser.set(user);
        localStorage.setItem('user', JSON.stringify(user));
        console.log('Usuario autenticado:', user);

        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.log('Error en login:', error);
        this.errorMessage.set('Error al iniciar sesión. Por favor, verifica tus credenciales.');
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });
  }

  logout() {
    this._token.set(null);
    this._currentUser.set(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/home']);
  }

  private decodeAndGetUser(): User | null {
    const token = this._token();
    if (!token) return null;

    try {
      // Decodificamos el Payload del JWT
      const decoded: any = jwtDecode(token);

      // Verificamos si el token ha expirado
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp && decoded.exp < currentTime) {
        this.logout();
        return null;
      }

      return {
        id: decoded.id,
        name: decoded.name,
        role: decoded.role,
        email: '', 
        profilePicture: decoded.profilePicture,
        birth: ''
      } as User;
      
    } catch (error) {
      console.error('Error decodificando el token:', error);
      return null;
    }
  }

}
