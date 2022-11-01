import { MnInputComponent } from './../../../components/input/input.component';
import { ToastComponent } from './../../../components/toast/toast.component';
import { UserService } from './../../../core/global/user.service';
import { Router } from '@angular/router';
import { GlobalEventService } from './../../../core/global/global.service';
import { CookieService } from '@ngx-toolkit/cookie';
import { AccountService } from './../../../core/account/account.service';
import { UserLogin } from './../../../core/model/User';
import { FormGroup, FormBuilder, Validators, FormControl, FormsModule } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Submitable } from 'src/app/components/mn-form/mn-form.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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
  ) {


  }

  ngOnInit() { }

  submit: Submitable = {
    submit: async () => {
      return await new Promise((ok, reject) => {

        this.loading = true
        this.accountService.login({ email: this.email, password: this.password })
          .subscribe({
            next: (response: any) => {
              const { token, user } = response
              console.log('TOKEN', token)
              this.accountService.logout();
              this.cookieService.setItem(this.globalEventService.AUTH_TOKEN_COOKIE, token);
              window.localStorage.setItem('current_user', JSON.stringify(user))
              window.localStorage.setItem('auth_token', JSON.stringify(token));
              this.userService.user = user
              this.globalEventService.loginEvent.emit(user);
              this.loading = false;
              this.router.navigate(['/']);
              ok(true);
            },
            error: (err) => {
              this.resolverErrorServer(err.error);
              this.loading = false;
              reject(true);
            }
          })
      });

    }
  }

  recovery_passord() {
    console.log('RECUPERANDO SENHA.')
  }

  resolverErrorServer(error: {path: string, message: string}) {
    if(error.path == 'email') { this.emailInput?.postInvalidade(error.message) }
    if(error.path == 'password') { this.passwordInput?.postInvalidade(error.message) }
  }


}



