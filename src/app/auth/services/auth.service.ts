import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from 'src/environments/environments';
import { AuthCustomer, Customer, CustomerRegister } from '../interfaces/customer.interface';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private baseUrl = environment.backBaseUrl;

  private http = inject( HttpClient );

  constructor() {};

  authCustomer = ( authCustomer: AuthCustomer ): Observable<any> => {
    return this.http.post<string>(`${this.baseUrl}/auth-server/auth/authenticate`, authCustomer)
      .pipe(
        tap( response => console.info('RESPONSE: ', response) ),
        catchError( error => {
          return throwError(() => new Error(`Error en la consulta authCustomer ${error}`))
        })
      )
  };

  registerCustomer = ( customerRegister: CustomerRegister ): Observable<Customer> => {
    return this.http.post<Customer>(`${this.baseUrl}/auth-server/users/createUser`, customerRegister)
    .pipe(
        tap( response => console.info('RESPONSE: ', response) ),
        catchError( error => {
          return throwError(() => new Error(`Error en la consulta registerCustomer ${error}`))
        })
      )
  };
}
