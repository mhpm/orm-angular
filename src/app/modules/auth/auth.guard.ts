import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isAuthenticated = !!localStorage.getItem('isLoggedIn'); // Example check for authentication

  if (isAuthenticated) {
    return true;
  } else {
    router.navigate(['/']); // Redirect to home or login page if not authenticated
    return false;
  }
};
