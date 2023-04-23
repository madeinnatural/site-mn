import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from '@ngx-toolkit/cookie';
import { LoginRequest, SignupRequest, login, signup } from 'src/app/states-handler/store/account.store';
import { ServerService } from '../services/server.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private store  :Store<any>,
    private cookie :CookieService,
    private router :Router,
    private server :ServerService
  ) {}

  login(data: LoginRequest) {
    if (!data.email || !data.password) throw new Error('Email and password are required');
    this.store.dispatch(login({ payload: data }));
  }

  logout() {
    this.cookie.clear();
    this.router.navigate(['/']);
  }

  signup(data: SignupRequest) {
    this.store.dispatch(signup({ payload: data }));
  }

  recoveryPassword(email: string) {
    return this.server.post<{message: string}>('recovery-password', { email });
  }
}
