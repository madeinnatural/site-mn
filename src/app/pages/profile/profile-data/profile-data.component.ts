import { Address } from './../../../core/model/User';
import { GlobalEventService } from './../../../core/global/global.service';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from './../../../core/global/user.service';
import User from 'src/app/core/model/User';
import { AccountService } from './../../../core/account/account.service';

import { Router } from '@angular/router';
import { ServerService } from './../../../core/server/server.service';
import { Component, Input, OnInit } from '@angular/core';
import { Submitable } from 'src/app/components/mn-form/mn-form.component';

@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.scss']
})
export class ProfileDataComponent implements OnInit {

  dataUserResponse?: any;

  loading = false;
  loadingAccess = false;
  statusUpdate: 'success' | 'danger' = 'success';

  user: User = {
    name: '',
    email: '',
    cnpj: '',
    phone: '',
    adresses: {
      cep: '',
      street: '',
      number: '',
      city: '',
      state: '',
    },
    adresses_main: '',
    id: 0,
  }

  cpf_cnpj: string = '';

  address = {
    cep: '',
    street: '',
    number: '',
    city: '',
    state: '',
  }

  constructor(
    private userService: UserService,
    public server: ServerService,
    public router: Router,
    public global: GlobalEventService
  ) {
    this.server.getUserData().subscribe({
      next: (data: User) => {
        this.user = data;
        const [ street, number, city, state, cep ]: Array<string> = (data as any).adresses.split(', ');
        this.user.adresses = {
          city,
          state,
          cep,
          number,
          street,
        }
        this.address = {
          city,
          state,
          cep,
          number,
          street,
        }
        if (this.user.cnpj) this.cpf_cnpj = this.user.cnpj;
        else if (this.user.cpf) this.cpf_cnpj = this.user.cpf;
      },
      error: (err: any) => {console.log('ALGO DE ERRADO NÃO ESTÁ CERTO ¬¬')}
    });
  }

  password = '';
  password_confirmation = '';

  passwordMatchValidator() {
    return this.password == this.password_confirmation;
  }

  updateDataAddress: Submitable = {
    submit: () => {
      return new Promise(async (resolve, reject) => {
        this.loading = true;

        if (!this.address) throw new Error('Endereço não encontrado');

        try {
          const { response } = await this.updateUser(this.address);
          console.log('RESPOSTAR: ',response.adresses);

          const [ street, number, city, state, cep ] = response.adresses.split(', ');

          console.log({
            city,
            state,
            cep,
            number,
            street,
          })

          this.user.adresses = {
            city,
            state,
            cep,
            number,
            street,
          };

          this.address = {
            city,
            state,
            cep,
            number,
            street,
          };

          this.loading = false;
          resolve(true);
        } catch (err) {
          this.global.goAlert.emit({
            text: 'Erro ao atualizar endereço',
            type: 'danger',
            duration: 5000
          })
          this.loading = false;
          reject(true);
        }
      });
    }
  }

  async updateUser(address: Address): Promise<{
    response: {
      adresses: string;
    }
  }> {
    return await this.server.updateAddress(address);
  }

  updateDataPesonal: Submitable = {
    submit: async () => {
      this.loading = true;
      this.statusUpdate = 'success';
      this.cpf_cnpj = this.cpf_cnpj.replace(/\D/g, '');
      if (this.cpf_cnpj.length == 14) {
        this.user.cnpj = this.cpf_cnpj;
        this.user.cpf = '';
      } else {
        this.user.cpf = this.cpf_cnpj;
        this.user.cnpj = '';
      }

      return new Promise(async (ok, rejec) => {
        try {
          const res = await this.server.updateUser(this.user);
          this.userService.updateUserLocal(res);
          this.router.navigate(['profile/profile_data']);
          this.loading = false;
          ok(true);
        } catch(err) {
          this.statusUpdate = 'danger';
          this.loading = false;
          rejec(true);
        }
      });
    }
  }

  updateDataLogin: Submitable = {
    submit: async () => {
      this.loadingAccess = true;
      this.statusUpdate = 'success';
      if (!this.passwordMatchValidator) throw new Error('Senha não confere');
      this.user.password = this.password;
      return new Promise(async (ok, rejec) => {
        const res = await this.server.updateUser(this.user)
        this.userService.updateUserLocal(res);
        this.router.navigate(['profile/profile_data']);
        this.loading = false;
        ok(true);
      }).catch((err) => {
        this.statusUpdate = 'danger';
        this.loading = false;
        err(true);
      });
    }
  }

  ngOnInit() { }

}
