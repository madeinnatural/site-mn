import { ServerService } from './../server/server.service';
import { CookieService } from '@ngx-toolkit/cookie';
import { Injectable } from '@angular/core';
import User from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user?: User;

  constructor(
    private cookieService:CookieService,
    private server: ServerService
  ) {

    const user = cookieService.getItem('current_user');

    // VERIFICAR SE JÁ EXISTE UM USUÁRIO NO STORAGE.
    if (user) this.user = JSON.parse(user);

  }

  getCurrentUserLocalStorage() {
    const userJson = this.cookieService.getItem('current_user');
    if (userJson) {
      const user: User = {
        id: JSON.parse(userJson).id,
        name: JSON.parse(userJson).name,
        email: JSON.parse(userJson).email,
        password: JSON.parse(userJson).password,
        phone: JSON.parse(userJson).phone,
        adresses: JSON.parse(userJson).address,
        adresses_main: JSON.parse(userJson).address_main,
        cpf: JSON.parse(userJson).cpf,
        cnpj: JSON.parse(userJson).cnpj,
      }
      return user
    }
    return {
      name: '',
      email: '',
      cnpj: '',
      phone: '',
      adresses: '',
      adresses_main: '',
      id: 0,
    };
  }

  setUserLocalStorage(user: User){
    this.cookieService.setItem('current_user', JSON.stringify(user));
  }
  setUserService(user: User) {
    this.user = user;
  }

  updateUserLocal(user: User) {
    this.setUserLocalStorage(user);
    this.setUserService(user);
  }

}
