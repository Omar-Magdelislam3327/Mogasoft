import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  if (!authService.isLoggedIn()) {
    router.navigate(['/ms-admin']);
    return false;
  }

  const userRole = authService.getRole();
  const requiredRoles = route.data?.['roles'] as string[];

  if (!requiredRoles || requiredRoles.length === 0) {
    return true;
  }

  if (!userRole || !requiredRoles.includes(userRole)) {
    if (userRole === 'Admin') {
      return true;
    }
    
    if (userRole === 'Marketer') {
      if (!state.url.includes('/admin/blogs')) {
        router.navigate(['/admin/blogs']);
        return false;
      }
      return true;
    }

    router.navigate(['/ms-admin']);
    return false;
  }

  return true;
};
