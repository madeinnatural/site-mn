import { Router } from '@angular/router';
import { GlobalEventService } from './../../../core/global/global.service';
import { CookieService } from '@ngx-toolkit/cookie';
import { AccountService } from './../../../core/account/account.service';
import { UserRegister } from './../../../core/model/User';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Submitable } from 'src/app/components/mn-form/mn-form.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  promo = false;

  errorsResponseServer: Array<{ campo: string; msg: string }> = [];

  @Input('type') current_type: 'login' | 'registration' = 'login';

  @Output('changeType') changeType = new EventEmitter<
    'login' | 'registration'
  >();
  @Output('register') register = new EventEmitter<UserRegister>();


  get type() {
    return this.current_type;
  }

  set type(current_type: 'login' | 'registration') {
    this.changeType.emit(current_type);
    this.current_type = current_type;
  }

  formCadastro: FormGroup;

  @ViewChild('form') form: any;

  name = '';
  email = '';
  cpf_cnpj = '';
  phone = '';
  password = '';
  password_confirmat = '';




  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private cookieService: CookieService,
    private globalEventService: GlobalEventService,
    private router: Router
  ) {
    this.formCadastro = formBuilder.group({
      name: [null, [Validators.required]],
      lastname: [null],
      email: [null, [Validators.required, Validators.email]],
      cpf_cnpj: ['', [Validators.required]],
      phone: [null, [Validators.required]],
      password: [null, [Validators.required]],
      promo_active: [false],
    });
  }

  ngOnInit() { }

  verifyValid(campo: any) {
    return (
      !this.formCadastro.get(campo)?.valid &&
      this.formCadastro.get(campo)?.touched
    );
  }

  errorStyle(campo: any) {
    return {
      'has-error': this.verifyValid(campo),
      'has-feedback': this.verifyValid(campo),
    };
  }

  submit: Submitable = {
    submit: async () => {
      return new Promise((ok, reject) => {
        {
          this.errorsResponseServer = [];

          console.log(this.name);

          if (this.errorsResponseServer.length > 0) return false;



          this.accountService
            .reginterUser({
              name: this.name,
              email: this.email,
              cpf_cnpj: this.cpf_cnpj,
              phone: this.phone,
              password: this.password,
              promo_active: true,
              lastname: this.name,
            })
            .subscribe({
              next: (res: any) => {
                this.accountService.logout();

                const { user, auth_token } = res;
                const current_user_string = JSON.stringify(user);

                this.cookieService.setItem('current_user', current_user_string);
                this.cookieService.setItem(
                  this.globalEventService.AUTH_TOKEN_COOKIE,
                  auth_token
                );

                window.localStorage.setItem(
                  'current_user',
                  current_user_string
                );

                this.globalEventService.loginEvent.emit(user);

                ok(true);

                this.router.navigate(['/']);
              },
              error: (rej: any) => {
                const error = rej.error;

                const { msg, field } = error;

                error.forEach((element: any) => {
                  this.errorsResponseServer.push({
                    msg: element.msg,
                    campo: 'email',
                  });
                });

                reject(false);
              },
            });

          return true;
        }
      });
    },
    cancel: () => {
      return new Promise(() => { });
    },
  };
}

