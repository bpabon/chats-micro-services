import { Observable, timer, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
const isProd = environment.production;
export function handleRetry<T>(maxRetries: number = 2, delayMs: number = 1000) {
  return (source: Observable<T>): Observable<T> => {
    return source.pipe(
      retry({
        count: maxRetries,
        delay: (error: HttpErrorResponse, retryCount: number) => {
           if (error.status >= 400 && error.status < 500) {
            if (!isProd) console.warn(`❌ Error ${error.status}, no se reintenta: ${error.message}`);
            throw error;
          }
          if (!isProd) console.warn(`🔁 Reintento #${retryCount} tras error: ${error.message}`);
          return timer(delayMs);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if(!isProd) console.error('Error final tres reintentos fallidos:', error);
        return throwError(() => error);
      })
    );
  };
}
export function respError(error: HttpErrorResponse){
  return throwError(() => ({
    error,
    message: error.message,
    status: error.status,
  }));
}
