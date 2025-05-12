import { Router,CanActivateFn } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { isPlatformServer } from '@angular/common';
import { AuthService } from '../../modules/auth/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformServer(platformId)) {
    return false;
  }
  return authService.isLoggedIn().pipe(
    map((isLogged: boolean) => {
      if (isLogged) {
        return true;
      } else {
        return router.createUrlTree(['/auth/login']);
      }
    }),
    catchError(() => {
      return of(router.createUrlTree(['/auth/login']));
    }));
};
