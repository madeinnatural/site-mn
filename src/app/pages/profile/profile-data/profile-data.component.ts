import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
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

  dataUserResponse?: Observable<User>;

  loading = false;
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
      name: [this.user.name],
      cnpj: [this.user.cnpj],
      email: [this.user.email],
      phone: [this.user.phone],
      password: [''],
    })
  }

  updateDataPesonal() {
    console.log(this.user)
    this.loading = true;
    this.statusUpdate = 'success';
    this.user.name = this.dataUser.value.name;
    this.user.cnpj = this.dataUser.value.cnpj;
    this.user.phone = this.dataUser.value.phone;

    setTimeout(() => {

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
    }, 3000 )

  }

  updateDataLogin() {}


  ngOnInit() {}


}
