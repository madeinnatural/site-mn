import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { CookieService } from '@ngx-toolkit/cookie';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { MnInputComponent } from './../../../components/input/input.component';
import { ToastComponent } from './../../../components/toast/toast.component';
import { UserService } from './../../../core/services/user.service';
import { GlobalEventService } from './../../../core/services/global.service';
import { AccountService } from './../../../core/account/account.service';
import { Submitable } from '../../../components/mn-form/mn-form.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  durationInSeconds = 5;

  openSnackBar(msg: string) {
    const config = new MatSnackBarConfig();
    config.duration = this.durationInSeconds * 1000,
    config.panelClass = ['error-snackbar']
    config.horizontalPosition = 'end';
    config.verticalPosition = 'top';
    config.data = msg;
    this._snackBar.openFromComponent(ToastComponent, config);
  }

  emailErrorMsg: string = '';
  status_loading: 'success' | 'warning' | 'danger' = 'success'
  errorsResponseServer: Array<{ msg: string, campo: string }> = [];
  loading: boolean = false;
  email = '';
  password = '';

  @ViewChild('emailInput') emailInput?: MnInputComponent;
  @ViewChild('passwordInput') passwordInput?: MnInputComponent;

  constructor(
    public formBuilder: FormBuilder,
    private accountService: AccountService,
    private cookieService: CookieService,
    private globalEventService: GlobalEventService,
    private userService: UserService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  submit: Submitable = {
    submit: async () => {
      return await new Promise((ok, reject) => {

        this.loading = true
        this.accountService.login({ email: this.email, password: this.password })
          .subscribe({
            next: (response: any) => {
              const { token, user } = response;
              this.cookieService.setItem(this.globalEventService.AUTH_TOKEN_COOKIE, token);
              this.userService.updateUserLocal(user);
              this.globalEventService.loginEvent.emit(user);
              this.loading = false;
              this.router.navigate(['/']);
              ok(true);
            },
            error: (err: any) => {
              this.resolverErrorServer(err.error);
              this.loading = false;
              reject(true);
            }
          })
      });

    }
  }

  recovery_passord() {
    this.router.navigate(['password-recovery']);
  }

  resolverErrorServer(error: any) {
    if(error.msg == 'Senha incorreta') { this.passwordInput?.postInvalidade('Senha incorreta')}
    if(error.path == 'email') { this.emailInput?.postInvalidade(error.message) }
    if(error.path == 'password' || error.msg == 'Usuário não exite') { this.emailInput?.postInvalidade('Usuário não exite') }
  }

}



