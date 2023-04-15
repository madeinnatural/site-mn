import { Component, ViewChild } from '@angular/core';
import { MnInputComponent } from './../../../components/input/input.component';
import { AccountService } from './../../../core/account/account.service';
import { Submitable } from '../../../components/mn-form/mn-form.component';
import { SignupRequest } from 'src/app/states-handler/store/account.store';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {

  @ViewChild('form') form: any;
  @ViewChild('email') email?: MnInputComponent;

  cpf_cnpj = '';

  formRegister: SignupRequest = {
    name: '',
    email: '',
    password: '',
    phone: '',
    cpfCnpj: '',
  }

  constructor(
    private accountService: AccountService,
  ) { }

  submit: Submitable = {
    submit: async () => {
      return new Promise((ok, reject) => {
        this.formRegister.cpfCnpj = this.cpf_cnpj;
        this.accountService.signup(this.formRegister);
        ok(true)
      });
    },
  };
}

