import { Router } from '@angular/router';
import { CookieOptions, CookieService } from '@ngx-toolkit/cookie';
import { UserRegister } from './../model/User';
import { ServerService } from './../server/server.service';
import { GlobalEventService } from './../global/global.service';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import User, { UserLogin } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  hidderHeaderFooter = new EventEmitter<boolean>();
  current_user: User = {
    id: 0,
    adresses: '',
    adresses_main: '',
    cnpj: '',
    email: '',
    name: '',
    phone: '',
  };

  constructor(
    private http: HttpClient,
    private globalEventService: GlobalEventService,
    private cookieService:CookieService,
    private router: Router
  ) {
    const current_user = localStorage.getItem('current_user');

    if (current_user) {
      this.current_user = JSON.parse(current_user);
    }

    this.globalEventService.loginEvent.subscribe(user => {
      this.current_user = user;
    })
  }

  loginActiver(active: boolean) {
    this.hidderHeaderFooter.emit(active);
  }

  login(dataUser: UserLogin) {
    return this.http.post(environment.baseUrl + 'token/login',{email: dataUser.email, password: dataUser.password});
  }

  logout () {
    this.cookieService.removeItem('auth_token');
    this.cookieService.removeItem('current_user');
    window.localStorage.removeItem('current_user');
    window.localStorage.removeItem('auth_token');
    this.current_user =  {
      id: 0,
      adresses: '',
      adresses_main: '',
      cnpj: '',
      email: '',
      name: '',
      phone: '',
    };

    this.globalEventService.logoutEvent.emit('logout');
  }

  reginterUser(dataReginter: UserRegister) {
    return this.http.post<{user: User, auth_token: string}>(environment.baseUrl + 'users/register', this.formateData(dataReginter));
  }

  formateData( dataReginter: UserRegister ) {

    const data = {
      name: dataReginter.name,
      password: dataReginter.password,
      email: dataReginter.email,
      phone: dataReginter.phone,
      cpf: '',
      cnpj: ''
    }

    // Verifica CPF
    if ( data.cnpj.length === 14 ) data.cnpj = dataReginter.cpf_cnpj;
    if ( data.cpf.length === 11 ) data.cpf = dataReginter.cpf_cnpj;

    return data

  }

}
