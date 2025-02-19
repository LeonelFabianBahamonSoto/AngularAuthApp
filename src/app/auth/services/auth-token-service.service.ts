import { inject, Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';

import { Token } from '../../models/token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenServiceService {

  private ACCESS_KEY = 'access';
  private REFRESH_KEY = 'refresh';

  private jwtHelper = inject( JwtHelperService );

  public access!: Token;
  public refresh!: Token;

  /**
   * Se cargan los token desde el storage al moemnto de recargar/ entrar por la pagina
   */
  constructor() { }
}
