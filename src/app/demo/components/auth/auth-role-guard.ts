import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthRoleGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    const payload = this.decodeToken(token);
    if (!payload) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    const allowedRoles = route.data['roles'];

    if (!allowedRoles || allowedRoles.length === 0) {
      return true;
    }

    if (!allowedRoles.includes(payload.role)) {
      this.router.navigate(['/auth/access']);
      return false;
    }

    return true;
  }

  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  }
}