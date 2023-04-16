import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoginRequest, SignupRequest, login, logout, signup } from 'src/app/states-handler/store/account.store';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private store : Store<any>
  ) {}

  login(data: LoginRequest) {
    this.store.dispatch(login({ payload: data }));
  }

  logout() {
    this.store.dispatch(logout());
  }

  signup(data: SignupRequest) {
    this.store.dispatch(signup({ payload: data }));
  }
}
