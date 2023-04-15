import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoginRequest, SignupRequest, login } from 'src/app/states-handler/store/account.store';

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

  logout() { }

  signup(data: SignupRequest) { }
}
