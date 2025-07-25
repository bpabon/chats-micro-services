import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {
  LoginHttp,
  SuccessRegisterInterface,
  SuccessLoginInterface,
  ValidToken,
  changePasswordInterface,
} from '../models/auth-http';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { handleRetry, respError } from '../../../core/utils/rxjs-helpers';
import { LocalStorageService } from '../../../core/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  private http = inject(HttpClient);
  private readonly localStorageService = inject(LocalStorageService);

  getToken(): string | null {
    return this.localStorageService.get('token');
  }
  getLogin(myData: LoginHttp): Observable<SuccessLoginInterface> {
    return this.http
      .post<SuccessLoginInterface>(`${this.apiUrl}/auth/v1/api/login`, myData)
      .pipe(
        handleRetry(2, 1000),
        tap((res: SuccessLoginInterface) => {
          this.localStorageService.set('token', res.token);
        }),
        catchError((error: HttpErrorResponse) => {
          return respError(error);
        })
      );
  }
  postRegister(myData: LoginHttp): Observable<SuccessRegisterInterface> {
    return this.http
      .post<SuccessRegisterInterface>(
        `${this.apiUrl}/auth/v1/api/registerUser`,
        myData
      )
      .pipe(
        handleRetry(2, 1000),
        catchError((error: HttpErrorResponse) => {
          return respError(error);
        })
      );
  }
  changePassoword(myData: changePasswordInterface, token: string): Observable<SuccessRegisterInterface> {
    return this.http
      .put<SuccessRegisterInterface>(
        `${this.apiUrl}/auth/v1/api/changePassword/${token}`,
        myData
      )
      .pipe(
        handleRetry(2, 1000),
        catchError((error: HttpErrorResponse) => {
          return respError(error);
        })
      );
  }

  forgotPassword(
    myData: Omit<LoginHttp, 'password'>
  ): Observable<SuccessRegisterInterface> {
    return this.http
      .post<SuccessRegisterInterface>(
        `${this.apiUrl}/auth/v1/api/recoveryPassword`,
        myData
      )
      .pipe(
        handleRetry(2, 1000),
        catchError((error: HttpErrorResponse) => {
          return respError(error);
        })
      );
  }
  logout(): void {
    this.localStorageService.remove('token');
  }
  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp < currentTime;
    } catch (e) {
      return true;
    }
  }
  isLoggedIn(): Observable<boolean> {
    const token = this.getToken();
    if (!token || this.isTokenExpired(token)) {
      this.logout();
      return of(false);
    }
    return of(true);
  }
  checkValidJwtToken(jwt: string): Observable<ValidToken> {
    return this.http
      .get<ValidToken>(`${this.apiUrl}/auth/v1/jwt/validate-jwt-params/${jwt}`)
      .pipe(
        handleRetry(2, 1000),
        catchError((error: HttpErrorResponse) => {
          return respError(error);
        })
      );
  }
}
