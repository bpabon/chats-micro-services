import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../modules/auth/services/auth.service';
import { finalize } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  if (token) {
    const authReq = req.clone({
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
    // return next(authReq).pipe(
    //   finalize(() => loadingService.hide())
    // );
  }
  const jsonReq = req.clone({
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    }),
  });
  return next(jsonReq);
  // return next(jsonReq).pipe(
  //   finalize(() => loadingService.hide())
  // );
};
