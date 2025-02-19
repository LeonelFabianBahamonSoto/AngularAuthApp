import { Component, computed, inject, OnInit, signal } from "@angular/core";

import { Customer } from "src/app/auth/interfaces/customer.interface";

import { AuthService } from "src/app/auth/services/auth.service";
import { TokenService } from "src/app/services/token.service";
import { DashboardService } from "../../services/dashboard.service";

@Component({
  selector: "app-dashboard-layout",
  templateUrl: "./dashboard-layout.component.html",
  styleUrls: ["./dashboard-layout.component.sass"],
})
export class DashboardLayoutComponent implements OnInit {
  private dashboardService = inject(DashboardService);
  private authService = inject(AuthService);
  private tokenService = inject(TokenService);

  private currentCustomer = signal<Customer | undefined>(undefined);
  public customer = computed(() => this.currentCustomer());

  constructor() {}

  ngOnInit(): void {
    this.getCurrentCustomer();
  }

  getCurrentCustomer = () => {
    const { sub } = this.tokenService.getTokenDecode();

    this.dashboardService.getCustomer(sub).subscribe({
      next: (response) => {
        this.currentCustomer.set(response);
      },
      error: (error) => {
        console.error("Error al obtener el usuario actual. Error: ", error);
      },
    });
  };

  logOut = () => {
    this.currentCustomer.set(undefined);
    this.authService.logOut();
  };
}
