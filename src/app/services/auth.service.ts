import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models/user';
import { UserService } from './user.service';
import { Rol } from '../enums/rol';
import { JwtService } from '../helpers/jwt/jwt.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  login(username: string, password: string): Observable<boolean> {
    const user = this.userService.validateUser(username, password);
    if (user) {
      this.currentUserSubject.next(user);
      const token = this.jwtService.createToken(user.username);
      localStorage.setItem(
        'user',
        JSON.stringify({ user: user.username, role: user.role })
      );
      localStorage.setItem('token', JSON.stringify(token));
      return of(true);
    }
    return of(false);
  }

  logout() {
    this.currentUserSubject.next(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  get currentUser(): User {
    const userStorage = localStorage.getItem('user');
    const user = userStorage
      ? JSON.parse(userStorage)
      : this.currentUserSubject.value;
    return user;
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null || localStorage.getItem('user') !== null;
  }

  isAdmin(): boolean {
    return this.currentUser?.role === Rol.ADMIN;
  }
}
