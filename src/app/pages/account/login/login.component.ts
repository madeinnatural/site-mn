import { UserService } from './../../../core/global/user.service';
import { Router } from '@angular/router';
import { GlobalEventService } from './../../../core/global/global.service';
import { CookieService } from '@ngx-toolkit/cookie';
import { AccountService } from './../../../core/account/account.service';
import { UserLogin } from './../../../core/model/User';
import { FormGroup, FormBuilder, Validators, FormControl, FormsModule } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input('type') current_type: 'login' | 'registration' = 'login';

  @Output('changeType') changeType = new EventEmitter<'login' | 'registration'>();
  @Output('login') login = new EventEmitter<UserLogin>();

  msgEmailError: string = '';

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
    private router: Router
  ) {

    this.formLogin = this.formBuilder.group({
      email: [ '',[ Validators.email]],
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

          this.loading = false;

          window.history.forward()
          this.router.navigate(['/']);


        }, error: (err) =>{

          const { error, msg } = err.error

          console.log(msg)

          this.errorsResponseServer.push({ msg , campo: 'email'})
        }
      })

      this.loading = false;

      return;

    } else {

      setTimeout(()=>{
        this.loading = false;
      }, 2000);

        this.errorsResponseServer.push({msg: 'Email ou senha são obrigatórios', campo: 'email'})

      return;
    }

  }

  recovery_passord() {
    console.log('RECUPERANDO SENHA.')
  }

}



