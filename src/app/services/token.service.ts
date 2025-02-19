import { inject, Injectable } from "@angular/core";
import { tokenKey } from "src/environments/environments";
import { Token } from "../models/token.model";
import { AppStorageService } from "./app-storage.service";

@Injectable({
  providedIn: "root",
})
export class TokenService {
  private storage = inject(AppStorageService);

  private ACCESS_KEY = tokenKey.accessKey;
  // private REFRESH_KEY = tokenKey.refreshKey;

  private accessToken: Token;

  constructor() {
    this.accessToken = new Token(this.storage.getToken(this.ACCESS_KEY));
  }

  private setToken = (key: string, jwt: string) => {
    this.storage.setToken(key, jwt);
    return new Token(jwt);
  };

  private removeJwtToken = () => {
    this.storage.removeItem(this.ACCESS_KEY);
    return new Token(null);
  };

  public areTokenValid = () => {
    return this.accessToken.isTokenValid();
  };

  public saveToken = (jwt: string) => {
    const isTokenOk = this.areTokenValid();

    if( !isTokenOk ) this.removeToken();

    this.accessToken = this.setToken(this.ACCESS_KEY, jwt);
  };

  public getToken = () => {
    return this.storage.getToken(this.ACCESS_KEY);
  };

  public getTokenDecode = () => {
    return this.accessToken.decodeToken();
  };

  public removeToken = () => {
    this.accessToken = this.removeJwtToken();
  };
}
