import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { ValidatorService } from "src/app/shared/validators/validator.service";
import { AuthService } from "../../services/auth.service";

import { TokenService } from "src/app/services/token.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.sass"],
})
export class LoginPageComponent {
  private formB = inject(FormBuilder);
  private router = inject(Router);

  private authService = inject(AuthService);
  private tokenService = inject(TokenService);
  private validatorService = inject(ValidatorService);

  public loginForm: FormGroup = this.formB.group({
    username: [
      "bahamon4@gmail.com",
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40),
        Validators.pattern(this.validatorService.emailPattern),
      ],
      [],
    ],
    password: [
      "Toby.777",
      [Validators.required, Validators.minLength(1), Validators.maxLength(10)],
      [],
    ],
  });

  constructor() {}

  isValidField = ({ theField = "", theError = "" }): boolean => {
    return this.loginForm.get(theField)?.errors?.[theError];
  };

  loginRequestForm = (): void => {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.authService.authCustomer(this.loginForm.value).subscribe({
      next: (response) => {
        if (response) {
          this.router.navigateByUrl("/dashboard");
          return;
        }

        Swal.fire({
          icon: "error",
          title: "Error en la autenticación",
          text: "Ocurrio un error en la autenticación, por favor vuelva a intentar",
          confirmButtonText: "Volver",
        });

        this.loginForm.reset({
          userEmail: "",
          userPassword: "",
        });
      },
      error: (error) => {
        console.info('mi error: ', error);
        Swal.fire({
          icon: "error",
          title: "Error en la autenticación",
          text: "No fue posible autenticar al usuario",
          confirmButtonText: "Volver",
          footer: "<p>Revise sus credenciales de autenticación</p>",
        });

        this.loginForm.reset({
          userEmail: "",
          userPassword: "",
        });
      },
    });
  };
}
