import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MnInputComponent } from './../../../components/input/input.component';
import { GlobalEventService } from './../../../core/services/global.service';
import { AccountService } from './../../../core/account/account.service';
import { UserRegister } from './../../../core/model/interfaces/User';
import { Submitable } from '../../../components/mn-form/mn-form.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {

  @ViewChild('form') form: any;
  @ViewChild('email') email?: MnInputComponent;

  cpf_cnpj = '';

  formRegister: UserRegister = {
    name:'',
    email:'',
    password: '',
    phone:'',
    cpf: '',
    cnpj: '',
  }

  constructor(
    private accountService: AccountService,
    private globalEventService: GlobalEventService,
    private router: Router
  ) {}

  submit: Submitable = {
    submit: async () => {
      return new Promise((ok, reject) => {

          if (this.cpf_cnpj.length >= 14) this.formRegister.cnpj = this.cpf_cnpj;
          else this.formRegister.cpf = this.cpf_cnpj;

          this.accountService.reginterUser(this.formRegister)
            .subscribe({
              next: (res: any) => {
                this.accountService.logout();
                this.globalEventService.setDataUser(res);
                ok(this.router.navigate(['/']));
              },
              error: (rej: any) => {
                const {errors} = rej.error;
                errors.forEach((element: any) => {if (element.path == 'email') this.email?.postInvalidade(element.message)});
                reject(true);
              },
            });
          return true;
      });
    },
  };
}

