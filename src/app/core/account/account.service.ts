import { Quotation } from './../model/Product';
import { UserService } from './../global/user.service';
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
    private userService: UserService
  ) {
    // CHAMAR NO SEVIDOR
  }

  loginActiver(active: boolean) {
    this.hidderHeaderFooter.emit(active);
  }

  login(dataUser: UserLogin) {
    return this.http.post(environment.baseUrl + 'token/login',{email: dataUser.email, password: dataUser.password});
  }

  logout () {
    this.cookieService.clear();
    this.userService.user = {
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
    return this.http.post<{user: User, auth_token: string}>(environment.baseUrl + 'users/register', dataReginter);
  }

  getQuotes() {
    return this.http.get<Quotation[]>(environment.baseUrl + 'quotes');
  }

}
