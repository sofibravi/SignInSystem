import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const user = this.authService.currentUser;
    const userStorage = localStorage.getItem('user');

    if (!user && !userStorage && route.routeConfig?.path !== 'login') {
      this.router.navigate(['/login']);
      return false;
    }

    // if (!user && !userStorage) {
    //   this.router.navigate(['/login']);
    //   return false;
    // }

    if (route.routeConfig?.path === 'login' && (user || userStorage)) {
      this.router.navigate(['/album']);
      return false;
    }

    return true;
  }
}
