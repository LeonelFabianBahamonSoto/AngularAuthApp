import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})

export class AppStorageService {
  constructor() {}

  setToken = (key: string, token: string) => {
    if (!key || !token) return false;

    return sessionStorage.setItem(key, token);
  };

  getToken = (key: string) => {
    return sessionStorage.getItem(key);
  };

  removeItem = (key: string) => {
    return sessionStorage.removeItem(key);
  };
}
