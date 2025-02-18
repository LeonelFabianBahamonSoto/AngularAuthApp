import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { ValidatorService } from 'src/app/shared/validators/validator.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.sass'],
})

export class RegisterPageComponent {

  private fb = inject( FormBuilder );
  private validatorService = inject( ValidatorService );
  private authService = inject( AuthService );

  public registerForm: FormGroup = this.fb.group({
    fullName: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(20) ], []],
    lastName: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(20) ], []],
    identificationId: ['', [ Validators.required, Validators.min(5) ], []],
    email:    ['', [ Validators.required, Validators.minLength(5), Validators.pattern( this.validatorService.emailPattern ) ], []],
    password: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(20) ], []],
    roleName: ['VIEW_ACCOUNT', [ Validators.required ] ],
  });

  isValidField = ({ theField = '', theError = ''}): boolean => {
    return this.registerForm.get( theField )?.errors?.[ theError ];
  };

  constructor() {};

  onRegister = (): void => {
    if( this.registerForm.invalid ){
      this.registerForm.markAllAsTouched;
      return;
    };

    this.authService.registerCustomer( this.registerForm.value )
      .subscribe({
        next: response => {
          console.info( 'FINAL RES: ', response );
        },
        error: error => {
          console.error( '--> registerCustomer - ERROR: ', error );
        }
      });


    this.registerForm.reset({
      fullName: '',
      lastName: '',
      identificationId: '',
      email:    '',
      password: '',
      roleName: '',
    });
  };
}
