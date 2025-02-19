import { inject } from "@angular/core";
import { Router, type CanActivateFn } from "@angular/router";

import { AuthService } from "../services/auth.service";
import { TokenService } from "src/app/services/token.service";

import { AuthStatus } from "../interfaces/auth-status.enum";

export const isUnauthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const tokenService = inject(TokenService);
  const router = inject(Router);

  if (
    !tokenService.areTokenValid() &&
    authService.authStatus() === AuthStatus.unauthenticated
  ) {
    return true;
  }

  router.navigateByUrl("/dashboard");

  return false;
};
