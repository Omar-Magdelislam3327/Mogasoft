import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authService.isLoggedIn()) {
      console.log('User not logged in, redirecting to login');
      this.router.navigate(['/ms-admin']);
      return false;
    }

    const userRole = this.authService.getRole() || '';
    const allowedRoles = route.data['roles'] as string[];

    if (allowedRoles && !allowedRoles.includes(userRole)) {
      console.log(`Access denied: ${userRole} cannot access ${state.url}`);

      // Prevent infinite loop by checking if already on the redirection page
      if (state.url !== '/admin/blogs' && userRole === 'Marketer') {
        this.router.navigate(['/admin/blogs']);
      }

      return false;
    }

    return true;
  }
}
