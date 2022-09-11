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

  msgEmailError: string = '';
  fildMsgError: string = '';

  emailErrorMsg: string = '';

  hide: boolean = true;

  get val () {
    if (this.formLogin.get('email')?.errors && this.formLogin.get('email')?.touched) {
      this.emailErrorMsg = 'Email inválido';
      return true;
    }

    return false;
  }

  get valPassword () {
    if (this.formLogin.get('password')?.errors && this.formLogin.get('password')?.touched) {
      if (!this.fildMsgError.includes('Email')) this.fildMsgError = 'Senha inválida';
      return true;
    }

    return false;
  }

  errorsResponseServer: Array<{msg: string, campo: string}> = [];

  loading: boolean = false;

  formLogin: FormGroup;

  @ViewChild('email') email?: HTMLInputElement;
  @ViewChild('password') password?: HTMLInputElement;

  get type () {
    return this.current_type;
  }

  set type (current_type: 'login' | 'registration') {
    this.changeType.emit(current_type);
    this.current_type = current_type;
  }

  valid: Array<{error: string, filed: string}> = []

  constructor(
    public formBuilder: FormBuilder,
    private accountService:AccountService,
    private cookieService: CookieService,
    private globalEventService: GlobalEventService,
    private userService: UserService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {

    this.formLogin = this.formBuilder.group({
      email: [ '', [ Validators.email, Validators.required]],
      password: [ '', [Validators.required]]
    });

  }

  ngOnInit() {}

  startLogin() {

    this.loading = true

    const { value, valid } = this.formLogin;

    const { password , email } = value;

    this.errorsResponseServer = [];

    if ( valid ) {

      this.accountService.login({email, password})
        .subscribe({next: (response: any)=> {

          const { token, user } =  response

          this.cookieService.setItem(this.globalEventService.AUTH_TOKEN_COOKIE, token);

          window.localStorage.setItem('current_user', JSON.stringify(user))

          this.userService.user = user

          this.globalEventService.loginEvent.emit(user);

          this.loading = false;

          this.router.navigate(['/']);


        }, error: (err) =>{

          const { error, msg } = err.error

          this.openSnackBar(msg);

          this.errorsResponseServer.push({ msg , campo: 'email'})
        }
      })
      this.loading = false;
      return;

    } else {
        this.openSnackBar('Email ou senha são obrigatórios')
        this.errorsResponseServer.push({msg: 'Email ou senha são obrigatórios', campo: 'email'})
        this.loading = false;
      return;
    }

  }

  recovery_passord() {
    console.log('RECUPERANDO SENHA.')
  }

  validFild() {
    if (this.formLogin.hasError('email') && this.formLogin.get('email')?.touched) {
      this.fildMsgError = 'Email inválido';
      return true;
    } else if (this.formLogin.hasError('required') && this.formLogin.get('email')?.touched) {
      this.fildMsgError = 'Campo obrigatório';
      return true;
    }

    return false
  }

}



