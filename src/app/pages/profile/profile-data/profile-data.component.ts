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

  dataUserResponse?: Observable<User>;

  loading = false;
  loadingAccess = false;
  statusUpdate: 'success' | 'danger' = 'success';

  user: User = {
    adresses: '',
    adresses_main: '',
    cnpj: '',
    email: '',
    id: 0,
    name: '',
    phone: ''
  }

  constructor(
    private serverService: ServerService,
    private userService: UserService,
    public router: Router,
    private formBuilder: FormBuilder
  ) {

    const user_json = window.localStorage.getItem('current_user');
    const user = JSON.parse(user_json ? user_json : '');

    if (user) {
      this.user = user;
    }

  }

  password = '';
  password_confirmation = '';

  passwordMatchValidator() {
    return this.password == this.password_confirmation;
  }

  updateDataPesonal: Submitable = {
    submit: async () => {
      return new Promise((ok, rejec) => {
        this.loading = true;
        this.statusUpdate = 'success';
        this.dataUserResponse = this.userService.updateUser(this.user)
        this.dataUserResponse.subscribe({
          next: async (res) => {
            this.userService.updateUserLocal(res);
            this.router.navigate(['profile/profile_data']);
            this.loading = false;
            ok(true);
          },
          error: (err) => {
            this.statusUpdate = 'danger';
            this.loading = false;
            rejec(false);
          }
        })
      })
    }

  }



  updateDataLogin: Submitable = {
    submit: async () => {
      return new Promise((ok, reject) => {
        this.loadingAccess = true;
        this.statusUpdate = 'success';
        if (!this.passwordMatchValidator) throw new Error('Senha não confere');
        this.user.password = this.password;

        this.dataUserResponse = this.userService.updateUser(this.user)
        this.dataUserResponse.subscribe({
          next: (res) => {
            this.user = res;
            this.userService.updateUserLocal(this.user);
            this.router.navigate(['profile/profile_data']);
            this.loadingAccess = false;
            ok(true);
          },
          error: (err) => {
            this.statusUpdate = 'danger';
            this.loadingAccess = false;
            reject(true);
          }
        })
      })


    }
  }




  ngOnInit() { }


}
