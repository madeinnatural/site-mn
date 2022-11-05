import { GlobalEventService } from 'src/app/core/global/global.service';
import { CookieService } from '@ngx-toolkit/cookie';
import { Injectable } from '@angular/core';
import User from '../model/User';

let user: User = {
  name: '',
  email: '',
  cnpj: '',
  phone: '',
  adresses: '',
  adresses_main: '',
  id: 0,
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  path_token_json = '';
  user: any;

  private setUserLocalStorage(user: User){
    this.cookieService.setItem(this.path_token_json, JSON.stringify(user));
  }

  constructor(
    private cookieService:CookieService,
    private global: GlobalEventService
  ) {
    this.path_token_json = this.global.CURRENT_USER_COOKIE;
  }

  updateUserLocal(user: User) {
    this.setUserLocalStorage(user);
  }

}
