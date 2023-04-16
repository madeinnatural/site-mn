import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, map } from 'rxjs';
import { CookieService } from '@ngx-toolkit/cookie';

import {environment} from '../../../environments/environment';
import { AccountModel } from '../domain/model/account/account';
import { Store } from '@ngrx/store';
import { updateAccount } from 'src/app/states-handler/store/account.store';

@Injectable({
  providedIn: 'root'
})
export class AuthQuard implements CanActivate {

  constructor(
    private router: Router,
    private cookie: CookieService,
    private httpClient: HttpClient,
    private store: Store<{account: AccountModel}>
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const tokenIsValid =  this.verify().pipe(
      map((account: AccountModel) => {
        if (account) {
          this.store.dispatch(updateAccount({ account }));
          return true;
        }
        this.router.navigate(['account/login']);
        return false;
      }));

    tokenIsValid.subscribe({
      next: (tokenIsValid) => {},
      error: (error) => {
        this.router.navigate(['account/login']);
      }
    })

    return tokenIsValid;
  }

  private verify = (): Observable<AccountModel> => {
    const token = this.cookie.getItem(environment.PATH_ACCESS_TOKEN);
    if (!token) {
      this.router.navigate(['account/login']);
      throw new Error('Usuário não autenticado');
    }
    return this.httpClient.get<AccountModel>('load-account');
  }

}
