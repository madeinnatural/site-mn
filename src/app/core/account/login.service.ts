import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private userAutentication = false;

  constructor(
    public router: Router,
  ) { }

  loginUser(userLogin: UserLogin) {

    if (userLogin.email == '' || userLogin.password == '') {
      throw new Error('Ou email ou senha não pode ser nulo')
    } else {
      this.userAutentication = true;

      // COLOCA A LÓGICA DE LOGIN QUE RETONA O TOKEN OU CAMPOS INVALIDOS AQUI
      console.log(userLogin)

      this.router.navigate(['/'])
    }

  }

}
