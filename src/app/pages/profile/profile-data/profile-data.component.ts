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

  user: User;
  cpf_cnpj: string = '';

  constructor(
    private userService: UserService,
    public server: ServerService,
    public router: Router,
  ) {
    const user: User = this.userService.getCurrentUserLocalStorage();
    if(user.cnpj)this.cpf_cnpj = user.cnpj;
    if(user.cpf)this.cpf_cnpj = user.cpf;
    this.user = user;
  }

  password = '';
  password_confirmation = '';

  passwordMatchValidator() {
    return this.password == this.password_confirmation;
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
