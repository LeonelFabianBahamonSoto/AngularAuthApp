import { inject } from "@angular/core";
import { type CanActivateFn } from "@angular/router";
import { TokenService } from "src/app/services/token.service";
import { AuthStatus } from "../interfaces/auth-status.enum";
import { AuthService } from "../services/auth.service";

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const tokenService = inject(TokenService);

  if (
    tokenService.areTokenValid() &&
    authService.authStatus() === AuthStatus.authenticated
  )
    return true;

  authService.logOut();

  return false;
};
