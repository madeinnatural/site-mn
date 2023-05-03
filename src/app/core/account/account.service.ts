import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from '@ngx-toolkit/cookie';
import { LoginRequest, SignupRequest, login, signup } from 'src/app/states-handler/store/account.store';
import { ServerService } from '../services/server.service';

import {environment} from '../../../environments/environment';

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

  async login(data: LoginRequest): Promise<{ accessToken :string }> {
    if (!data.email || !data.password) throw new Error('Email and password are required');
    const { accessToken } = await this.server.submit<{ accessToken :string }>('login', data, { type: 'POST' });
    this.cookie.setItem(environment.PATH_ACCESS_TOKEN, accessToken);
    this.router.navigate(['/']);
    return { accessToken };
  }

  logout() {
    this.cookie.clear();
    this.router.navigate(['/']);
  }

  async signup(data: SignupRequest) {
    const { accessToken } = await this.server.submit<{ accessToken :string }>('signup', data, { type: 'POST' });
    this.cookie.setItem(environment.PATH_ACCESS_TOKEN, accessToken);
    this.router.navigate(['/']);
    return { accessToken };
  }

  recoveryPassword(email: string) {
    return this.server.post<{message: string}>('recovery-password', { email });
  }
}
