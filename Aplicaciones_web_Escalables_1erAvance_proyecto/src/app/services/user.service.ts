import { Injectable, signal,computed, inject } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  
  private _user = signal<User | null>(null);

  public user = this._user.asReadonly();


  createUser (user: User) {
    return this.http.post('http://localhost:8081/api/auth/register', user);
  }

  deleteUser (userId: string) {
    return this.http.delete(`http://localhost:8081/api/users/${userId}`);
  }

  updateUser (userId: string, user: Partial<User>) {
    return this.http.put(`http://localhost:8081/api/users/${userId}`, user);
  }


}


