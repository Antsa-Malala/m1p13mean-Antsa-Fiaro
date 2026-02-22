import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthRoleGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('connectedUser');

    if (!token || !userStr) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    const user = JSON.parse(userStr);

    const allowedRoles = route.data['roles'];

    if (!allowedRoles || allowedRoles.length === 0) {
      return true;
    }

    if (!allowedRoles.includes(user.role)) {
      this.router.navigate(['/auth/access']);
      return false;
    }

    return true;
  }
}