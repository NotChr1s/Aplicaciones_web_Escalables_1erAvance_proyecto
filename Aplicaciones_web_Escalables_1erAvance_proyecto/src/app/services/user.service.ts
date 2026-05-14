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
  private _activeUser = signal<User | null>(null);
  public activeUser = this._activeUser.asReadonly();

  setActiveUser(user: User | null) {
    this._activeUser.set(user);
  }

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
          const updatedUser = response.user;
          this._activeUser.set(updatedUser);

          if (this.authService.currentUser()?.id === userId) {
            this.authService.updateCurrentUser(updatedUser, response.token);
          }
        })
      );
  }

  deleteUser(userId: string) {
    return this.http.delete(`${this.apiUrl}/${userId}`, { headers: this.getHeaders() })
      .pipe(
        tap(() => {
          if (this._activeUser()?.id === userId) {
            this._activeUser.set(null);
            this.authService.logout(); 
          }
        })
      );
  }

}
