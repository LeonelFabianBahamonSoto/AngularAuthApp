import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

import { catchError, Observable, throwError } from "rxjs";

import { Customer } from "src/app/auth/interfaces/customer.interface";
import { TokenService } from "src/app/services/token.service";
import { environment } from "src/environments/environments";

@Injectable({
  providedIn: "root",
})

export class DashboardService {
  private http = inject( HttpClient );

  private baseUrl = environment.backBaseUrl;

  private tokenService = inject(TokenService);

  constructor() {};

  getCustomer = (customerEmail: string): Observable<Customer> => {
    const token = this.tokenService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .get<Customer>(
        `${this.baseUrl}/auth-server/users/getcustomerbyemail/${customerEmail}`,
        { headers }
      )
      .pipe(
        catchError((err) => {
          return throwError(() => err?.error);
        })
      );
  };
}
