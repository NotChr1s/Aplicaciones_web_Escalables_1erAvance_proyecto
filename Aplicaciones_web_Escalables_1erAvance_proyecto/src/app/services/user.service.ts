import { Injectable, signal, inject } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  private http = inject(HttpClient);
  private authService = inject(AuthService); 
  private apiUrl = 'http://localhost:8081/api/users';

  private _user = signal<User | null>(null);
  public user = this._user.asReadonly();

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
  }

  createUser(user: User) {
    return this.http.post('http://localhost:8081/api/auth/register', user);
  }

  updateUser(userId: string, data: Partial<User>) {
    return this.http.put<any>(`${this.apiUrl}/${userId}`, data, { headers: this.getHeaders() })
      .pipe(
        tap(response => {
          const userToSet = response.user || response; 
          if (this._user()?.id === userId) {
            this._user.set(userToSet);
          }
        })
      );
  }


  deleteUser(userId: string) {
    return this.http.delete(`${this.apiUrl}/${userId}`, { headers: this.getHeaders() })
      .pipe(
        tap(() => {
          if (this._user()?.id === userId) {
            this._user.set(null);
            this.authService.logout(); // Limpiar token y redirigir
          }
        })
      );
  }
}
