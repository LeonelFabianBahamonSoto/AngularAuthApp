import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidatorService } from 'src/app/shared/validators/validator.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass']
})

export class LoginPageComponent {

  private authService = inject( AuthService );
  private formB = inject( FormBuilder );
  private validatorService = inject( ValidatorService );

  public loginForm: FormGroup = this.formB.group({
    username: ['', [ Validators.required, Validators.minLength(3), Validators.maxLength(40), Validators.pattern( this.validatorService.emailPattern ) ], []],
    password: ['', [ Validators.required, Validators.minLength(5), Validators.maxLength(10) ], []],
  });

  constructor() {};

  isValidField = ({ theField = '', theError = ''}): boolean => {
    return this.loginForm.get( theField )?.errors?.[ theError ];
  };

  loginRequestForm = (): void => {
    if( this.loginForm.invalid ){
      this.loginForm.markAllAsTouched();
      return;
    };

    console.info( 'AUTH: ', this.loginForm.value );

    this.authService.authCustomer( this.loginForm.value )
      .subscribe({
        next: response => {
          console.info( 'RESPONSE: ', response );
        },
        error: error => {
          console.error( 'ERROR: ', error );
        }
      });

    this.loginForm.reset({
      userEmail: '',
      userPassword: '',
    })
  };

}
