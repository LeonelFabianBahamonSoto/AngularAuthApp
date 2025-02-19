import { HttpClient } from "@angular/common/http";
import { computed, effect, inject, Injectable, signal } from "@angular/core";

import { catchError, Observable, tap, throwError } from "rxjs";

import { environment } from "src/environments/environments";

import {
  AuthCustomer,
  Customer,
  CustomerRegister,
} from "../interfaces/customer.interface";
import { JwtAuth } from "../interfaces/jwtAuth.interface";

import { Router } from "@angular/router";
import { TokenService } from "src/app/services/token.service";
import { AuthStatus } from "../interfaces/auth-status.enum";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private baseUrl = environment.backBaseUrl;

  private http = inject(HttpClient);
  private router = inject(Router);

  private tokenService = inject(TokenService);

  private _authStatus = signal<AuthStatus>(AuthStatus.unauthenticated);
  public authStatus = computed(() => this._authStatus());

  constructor() {
    this.checkAuthStatus();
  }

  private checkAuthStatus = () => {
    const isAuth = this.tokenService.areTokenValid();

    if (isAuth) {
      this._authStatus.set(AuthStatus.authenticated);
    } else {
      this._authStatus.set(AuthStatus.unauthenticated);
      this.router.navigateByUrl("/auth/login");
    }
  };

  authCustomer = (authCustomer: AuthCustomer): Observable<JwtAuth> => {
    this._authStatus.set(AuthStatus.checking);

    return this.http
      .post<JwtAuth>(
        `${this.baseUrl}/auth-server/auth/authenticate`,
        authCustomer
      )
      .pipe(
        tap((response) => {
          if (response.jwt) {
            this.tokenService.saveToken(response.jwt);
            this._authStatus.set(AuthStatus.authenticated);
            return;
          } else {
            this._authStatus.set(AuthStatus.unauthenticated);
            return throwError(() => "No Authorized");
          }
        }),
        catchError((err) => {
          this._authStatus.set(AuthStatus.unauthenticated);
          return throwError(() => err?.error);
        })
      );
  };

  logOut = () => {
    this._authStatus.set(AuthStatus.unauthenticated);
    this.tokenService.removeToken();
    this.router.navigateByUrl("/auth/login");
  };

  registerCustomer = (
    customerRegister: CustomerRegister
  ): Observable<Customer> => {
    return this.http
      .post<Customer>(
        `${this.baseUrl}/auth-server/users/createUser`,
        customerRegister
      )
      .pipe(
        catchError((error) => {
          console.error("Error en la consulta registerCustomer: ", error);
          return throwError(
            () => new Error(`RegisterCustomer error -> ${error}`)
          );
        })
      );
  };
}
