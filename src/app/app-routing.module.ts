import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { isAuthenticatedGuard } from "./auth/guards/isAuthenticated.guard";
import { isUnauthenticatedGuard } from "./auth/guards/isUnauthenticated.guard";

const routes: Routes = [
  {
    path: "auth",
    canActivate: [isUnauthenticatedGuard],
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "dashboard",
    canActivate: [isAuthenticatedGuard],
    loadChildren: () =>
      import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
  },
  {
    path: "**",
    redirectTo: "auth",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
