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

        // COLOCA A LÓGICA DE LOGIN QUE RETONA O TOKEN OU CAMPOS INVALIDOS AQUI
        console.log(this.cookieService.getItem(this.globalEventService.AUTH_TOKEN_COOKIE))

        this.router.navigate(['/'])
      }
    } catch (error: any) {
      console.error(error.message)
    }

  }

  async userAuth() {

    const _token = localStorage.getItem('token');

    const token = JSON.parse( _token ? _token : '');

    // AQUI FAÇO A CHAMADO AO SERVIDOR PARA VERIFICAR SE É UM TOKEN VALIDO

    return false;
  }

}
