import { MnInputComponent } from './../../../components/input/input.component';
import { ToastComponent } from './../../../components/toast/toast.component';
import { UserService } from './../../../core/global/user.service';
import { Router } from '@angular/router';
import { GlobalEventService } from './../../../core/global/global.service';
import { CookieService } from '@ngx-toolkit/cookie';
import { AccountService } from './../../../core/account/account.service';
import { UserLogin } from './../../../core/model/interfaces/User';
import { FormGroup, FormBuilder, Validators, FormControl, FormsModule } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Submitable } from 'src/app/components/mn-form/mn-form.component';


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

  @Input('type') current_type: 'login' | 'registration' = 'login';

  @Output('changeType') changeType = new EventEmitter<'login' | 'registration'>();
  @Output('login') login = new EventEmitter<UserLogin>();

  emailErrorMsg: string = '';

  status_loading: 'success' | 'warning' | 'danger' = 'success'

  errorsResponseServer: Array<{ msg: string, campo: string }> = [];

  loading: boolean = false;

  email = '';
  password = '';

  @ViewChild('emailInput') emailInput?: MnInputComponent;
  @ViewChild('passwordInput') passwordInput?: MnInputComponent;

  get type() {
    return this.current_type;
  }

  set type(current_type: 'login' | 'registration') {
    this.changeType.emit(current_type);
    this.current_type = current_type;
  }

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
    if (error.msg == 'Senha incorreta') { this.passwordInput?.postInvalidade('Senha incorreta')}
    if(error.path == 'email') { this.emailInput?.postInvalidade(error.message) }
    if(error.path == 'password' || error.msg == 'Usuário não exite') { this.emailInput?.postInvalidade('Usuário não exite') }
  }


}



