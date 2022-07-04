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

      // VERIFIQUE SE EXISTE ALGUM TOKEN NO COOKIE
      const token_storage = this.cookieService.getItem(
        this.globalEventService.AUTH_TOKEN_COOKIE
      );

      // CASO EXISTA VERIFIQUE SE ELE É VALIDO E ESTAR VINCULADO A ALGUM USUÁRIO.
      if (token_storage) {

        try {

          await this.accountService.verifyToken(token_storage);

          this.router.navigate(['/']);

          // CASO O TOKEN RETOORNE TRUE ENTÃO USUÁRIO ESTAR AUTHORIZADO A VER A PAGINA.
        } catch (error) {
          // FAÇA O LOGIN PRA ELE

          this.accountService.login({email: userLogin.email, password: userLogin.password});
        }

        // FAÇA O LOGIN PRA ELE

        this.accountService.login(userLogin);
      } else {
        if (userLogin.email == '' || userLogin.password == '') {
          throw new Error('Ou email ou senha não pode ser nulo');
        } else {
          this.accountService.login({email: userLogin.email, password: userLogin.password}).subscribe( (res: any) => {
            this.cookieService.setItem(this.globalEventService.AUTH_TOKEN_COOKIE, res.token);
            this.router.navigate(['/']);
         }, error => {
            this.router.navigate(['/login'])
         })

        }
      }

      // result.subscribe(e => {

      //   this.cookieService.setItem(this.globalEventService.AUTH_TOKEN_COOKIE, e);

      // });
    } catch (error: any) {
      throw error;
    }
  }
}
