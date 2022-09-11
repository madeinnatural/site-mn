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

  setUserLocalStorage(user: User){
    this.cookieService.setItem('current_user', JSON.stringify(user));
  }
  setUserService(user: User) {
    this.user = user;
  }

  updateUser(user: User) {
    return this.server.updateUser(user);
  }

  updateUserLocal(user: User) {
    this.setUserLocalStorage(user);
    this.setUserService(user);
  }

}
