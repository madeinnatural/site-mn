import { GlobalEventService } from './../global/global.service';
import { CookieService } from '@ngx-toolkit/cookie';
import { ServerService } from './../server/server.service';
import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { UserLogin } from '../model/User';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private userAutentication = false;

  constructor(
    public router: Router,
    public server: ServerService,
    public cookieService: CookieService,
    public globalEventService: GlobalEventService
  ) {}

  async loginUser(userLogin: UserLogin) {

    try {

      const result = await this.server.login(userLogin);

      if (result.error) {
        throw new Error(result.msg);
      }

      console.log('result', result);

      if (userLogin.email == '' || userLogin.password == '') {
        throw new Error('Ou email ou senha não pode ser nulo')
      } else {

        this.cookieService.setItem(this.globalEventService.AUTH_TOKEN_COOKIE, result.token);

        this.router.navigate(['/'])
      }
    } catch (error: any) {
      throw error;
    }

  }

}
