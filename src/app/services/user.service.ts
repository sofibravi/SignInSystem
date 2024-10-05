import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Rol } from '../enums/rol';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [
    { username: 'admin', password: 'admin123', role: Rol.ADMIN },
    { username: 'user', password: 'user123', role: Rol.USER },
  ];

  getUsers(): User[] {
    return this.users;
  }

  validateUser(username: string, password: string): User | null {
    const user = this.users.find(
      (u) => u.username === username && u.password === password
    );
    return user || null;
  }
}
