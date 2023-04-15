import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';

import { MnInputComponent } from './../../../components/input/input.component';
import { AccountService } from './../../../core/account/account.service';
import { Submitable } from '../../../components/mn-form/mn-form.component';
import { ErrorStore } from './../../../states-handler/store/error.store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';

  @ViewChild('emailInput') emailInput?: MnInputComponent;
  @ViewChild('passwordInput') passwordInput?: MnInputComponent;

  constructor(
    public formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private store: Store<{error: ErrorStore}>
  ) {
    this.store.select('error').subscribe((error) => {
      if (error.trace == 'LOGIN_FAILURE') {
        this.emailInput?.postInvalidade(error.error);
      }
    })
  }

  submit: Submitable = {
    submit: async () => {
      return await new Promise((ok) => {
        setTimeout(() => {
          this.accountService.login({ email: this.email, password: this.password });
          ok(true)
        }, 1000);
      });
    }
  }

  recovery_passord() {
    this.router.navigate(['password-recovery']);
  }

}



