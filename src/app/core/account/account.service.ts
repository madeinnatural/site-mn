import { GlobalEventService } from './../global/global.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
    private globalEventService: GlobalEventService
  ) { }

  loginActiver(active: boolean) {
    this.hidderHeaderFooter.emit(active);
  }

  verifyToken(token: string){
    try {
      const result = new Promise((res) => {
        this.http.post<boolean>(environment.apiUrl + 'api/token/token_verify', {token}).subscribe(e => {
          res(e);
        })
      })
      return result
    } catch (error) {
      throw error
    }
  }

  login(dataUser: UserLogin) {
    return this.http.post(environment.apiUrl + 'api/token',{email: dataUser.email, password: dataUser.password})
  }


}
