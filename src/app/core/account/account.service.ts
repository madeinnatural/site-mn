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

  constructor(
    private http: HttpClient,
    private globalEventService: GlobalEventService,
    private cookieService:CookieService,
    private router: Router
  ) {}

  loginActiver(active: boolean) {
    this.hidderHeaderFooter.emit(active);
  }

  login(dataUser: UserLogin) {
    return this.http.post(environment.apiUrl + 'token/login',{email: dataUser.email, password: dataUser.password});
  }

  logout () {
    this.cookieService.removeItem('auth_token');
    this.cookieService.removeItem('current_user');
  }

  reginterUser(dataReginter: UserRegister) {

    const data_cpf_cpnj = dataReginter.cpf_cnpj;

    const data = {
      name: dataReginter.name,
      password: dataReginter.password,
      lastname: dataReginter.lastname,
      email: dataReginter.email,
      cpf: this.verifica_cpf_cnpj(data_cpf_cpnj) == 'CPF' ? data_cpf_cpnj : null,
      cnpj: this.verifica_cpf_cnpj(data_cpf_cpnj) == 'CNPJ' ? data_cpf_cpnj : null,
    }

    return this.http.post(environment.apiUrl + 'api/users/register', data)
  }

  private verifica_cpf_cnpj ( valor: string ) {

    // Garante que o valor é uma string
    valor = valor.toString();

    // Remove caracteres inválidos do valor
    valor = valor.replace(/[^0-9]/g, '');

    // Verifica CPF
    if ( valor.length === 11 ) {
        return 'CPF';
    }

    // Verifica CNPJ
    else if ( valor.length === 14 ) {
        return 'CNPJ';
    }

    // Não retorna nada
    else {
        return false;
    }


  }

}
