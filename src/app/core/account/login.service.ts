import { AccountService } from './account.service';
import { GlobalEventService } from './../global/global.service';
import { CookieService } from '@ngx-toolkit/cookie';
import { ServerService } from './../server/server.service';
import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { UserLogin } from '../model/User';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor(
    public router: Router,
    public server: ServerService,
    public cookieService: CookieService,
    public globalEventService: GlobalEventService,
    public accountService: AccountService
  ) {}

  async loginUser(userLogin: UserLogin) {

    try {

      this.accountService.login({email: userLogin.email, password: userLogin.password}).subscribe( (res: any) => {
        this.cookieService.setItem(this.globalEventService.AUTH_TOKEN_COOKIE, res.token);
        window.history.back();
      });

    } catch (error: any) {
      throw error;
    }
  }
}
