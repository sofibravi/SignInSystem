import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  createToken(username: string): string {
    const payload = {
      username,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    };
    return btoa(JSON.stringify(payload));
  }
  verifyToken(token: string): boolean {
    if (!token) return false;
    try {
      const payload: any = JSON.parse(atob(token));
      return payload.exp > Math.floor(Date.now() / 1000);
    } catch {
      return false;
    }
  }

  getToken(): string | undefined {
    const token = localStorage.getItem('token')?.replace(/(^"|"$)/g, '');
    return token;
  }
}
