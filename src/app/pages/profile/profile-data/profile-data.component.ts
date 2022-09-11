import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from './../../../core/global/user.service';
import User from 'src/app/core/model/User';
import { AccountService } from './../../../core/account/account.service';

import { Router } from '@angular/router';
import { ServerService } from './../../../core/server/server.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.scss']
})
export class ProfileDataComponent implements OnInit {

  dataUser: FormGroup;
  dataAccess: FormGroup;

  dataUserResponse?: Observable<User>;

  loading = false;
  loadingAccess = false;
  statusUpdate: 'success'|'danger' = 'success';

  user: User

  constructor(
    private serverService:ServerService,
    private userService: UserService,
    public router: Router,
    private formBuilder: FormBuilder
  ) {

    const user_json = window.localStorage.getItem('current_user');
    const user = JSON.parse(user_json ? user_json : '');

    if (user) {
      this.user = user;
    } else {
      this.user = {
        adresses: '',
        adresses_main: '',
        cnpj: '',
        email: '',
        id: 0,
        name: '',
        phone: ''
      }
    }

    this.dataUser = formBuilder.group({
      name: [this.user.name, [Validators.required, Validators.minLength(3)]],
      cnpj: [this.user.cnpj, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      phone: [this.user.phone, [Validators.required]],
      password: [''],
    });

    this.dataAccess = formBuilder.group({
      email: [this.user.email, [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      password_confirmation: ['', [Validators.required, this.passwordMatchValidator]],
    });
  }

  passwordMatchValidator(g: FormGroup) {
    if (g) return g.get('password')?.value === g.get('password_confirmation')?.value ? null : {'mismatch': true};
    return false
  }

  updateDataPesonal() {
    console.log(this.user)
    this.loading = true;
    this.statusUpdate = 'success';
    this.user.name = this.dataUser.value.name;
    this.user.cnpj = this.dataUser.value.cnpj;
    this.user.phone = this.dataUser.value.phone;

    this.dataUserResponse = this.userService.updateUser(this.user)
    this.dataUserResponse.subscribe({
      next: (res) => {
        this.user = res;
        this.userService.updateUserLocal(this.user);
        this.router.navigate(['profile/profile_data']);
        this.loading = false;
      },
      error: (err) => {
        this.statusUpdate = 'danger';
        this.loading = false;
      }
    })
  }

  updateDataLogin() {
    this.loadingAccess = true;
    this.statusUpdate = 'success';
    this.user.email = this.dataAccess.value.email;
    this.user.password = this.dataAccess.value.password;

    this.dataUserResponse = this.userService.updateUser(this.user)
    this.dataUserResponse.subscribe({
      next: (res) => {
        this.user = res;
        this.userService.updateUserLocal(this.user);
        this.router.navigate(['profile/profile_data']);
        this.loadingAccess = false;
      },
      error: (err) => {
        this.statusUpdate = 'danger';
        this.loadingAccess = false;
      }
    })
  }


  ngOnInit() {}


}
