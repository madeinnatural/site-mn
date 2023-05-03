import { Component, ViewChild } from '@angular/core';
import { MnInputComponent } from './../../../components/input/input.component';
import { AccountService } from './../../../core/account/account.service';
import { Submitable } from '../../../components/mn-form/mn-form.component';
import { SignupRequest } from 'src/app/states-handler/store/account.store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {

  @ViewChild('cpfCnpj') cpfCnpj?: MnInputComponent;
  @ViewChild('email')   email?: MnInputComponent;

  formRegister: SignupRequest = {
    name: '',
    email: '',
    password: '',
    phone: '',
    cpfCnpj: '',
  }

  constructor(
    private accountService: AccountService,
    private store: Store<any>,
  ) {
    this.store.select('error').subscribe((error: {error: string, trace: string}) => {
      console.log(error.error);
      if (error.trace == 'SIGNUP_FAILURE') {
        if(error.error.toLocaleLowerCase().replace('-', '').includes('email')) {
          this.email?.postInvalidade(error.error);
        }
        if(error.error.toLocaleLowerCase().replace('/', '').includes('cpfcnpj')) {
          this.cpfCnpj?.postInvalidade(error.error);
        }
      }
    })
  }

  submit: Submitable = {
    submit: async () => {
      return new Promise(async (ok, res) => {
        try {
          const response = await this.accountService.signup(this.formRegister);
          ok(response);
        } catch (error) {
          console.log('ERROR ERROSO',error);
          const msg = (error as any).error.error || 'Erro ao cadastrar';
          if (msg.toLocaleLowerCase().includes('email')) {
            this.email?.postInvalidade(msg);
          } else if (msg.toLocaleLowerCase().includes('cpfcnpj')) {
            this.cpfCnpj?.postInvalidade(msg);
          }
          res(error);
        }
      });
    },
  };
}

