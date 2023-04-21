import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { CookieService } from '@ngx-toolkit/cookie';
import { Store } from '@ngrx/store';

import { AccountModel } from '../domain/model/account/account';
import { updateAccount } from '../../states-handler/store/account.store';

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
    return this.httpClient.get<AccountModel>('load-account')
    .pipe(
      switchMap((account) => {
        this.store.dispatch(updateAccount({ account }));
        return of(true);
      }),
      catchError(() => {
        this.cookie.clear();
        this.router.navigate(['account/login']);
        return of(false)
      }),
    );
  }
}
