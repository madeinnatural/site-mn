import { UserService } from './../global/user.service';
import { AccountService } from './account.service';
import { GlobalEventService } from './../global/global.service';
import { CookieService } from '@ngx-toolkit/cookie';
import { ServerService } from './../server/server.service';
import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import User, { UserLogin } from '../model/User';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor(
    public router: Router,
    public server: ServerService,
    public cookieService: CookieService,
    public globalEventService: GlobalEventService,
    public accountService: AccountService,
    public userService: UserService,
  ) {}

  async loginUser(userLogin: UserLogin) {

    try {

      this.accountService.login(
        {email: userLogin.email, password: userLogin.password}
      ).subscribe( (res: any ) => {

        const { token, user } = res;

        // SALTAR O TOKEN DO USUÁRIO NO LOCALSTORAGE.
        this.cookieService.setItem(this.globalEventService.AUTH_TOKEN_COOKIE, token);

        // SALVAR O USUÁRIO NO SERVICE.
        this.accountService.current_user = user;

        // SALVA O USUÁRIO EM UM SERVIÇO.
        this.userService.setUserLocalStorage(user);

        this.userService.user = user;

        // RETORNA PARA ROTA ANTERIOR.
        this.router.navigate(['/']);
      });

    } catch (error: any) {
      throw error;
    }
  }
}
