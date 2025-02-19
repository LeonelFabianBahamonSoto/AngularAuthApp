import { Injectable } from "@angular/core";
import { tokenKey } from "src/environments/environments";

@Injectable({
  providedIn: "root",
})
export class AppCryptoServiceService {
  private ACCESS_KEY = tokenKey.accessKey;
  private REFRESH_KEY = tokenKey.refreshKey;

  constructor() {}
}
