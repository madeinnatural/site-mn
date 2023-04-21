import { logout } from './../store/account.store';
import { switchMap, tap, map, catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { login, loginFailure, loginSuccess, signup, signupFailure, signupSuccess } from '../store/account.store';

import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { CookieService } from '@ngx-toolkit/cookie';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '../../core/domain/model/http/http.model';
import { ToastService } from '../../core/services/toast.service';

@Injectable({
  providedIn: "root"
})
export class AccountEffectsService {

  constructor(
    private http     :HttpClient,
    private actions$ :Actions,
    private store    :Store<any>,
    private toast    :ToastService,
    private cookie   :CookieService,
    private router   :Router
  ) {}

  loginEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(login),
      switchMap((action) => {
        return this.http.post<{accessToken: string}>(`login`, action.payload);
      }),
      catchError((data) => {
        this.toast.openSnackBar(data.error.error, 'error-snackbar');
        this.store.dispatch(loginFailure({ message: data.error.error }));
        return of({ accessToken: null })
      }),
      map(({accessToken}) => {
        if (!accessToken) return loginFailure({ message: 'Login failed' });
        this.cookie.setItem(environment.PATH_ACCESS_TOKEN, accessToken);
        this.router.navigate(['/']);
        return loginSuccess({ accessToken })
      }),
    )
  )

  signupEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(signup),
      switchMap((action) => {
        const response = this.http.post<{accessToken: string}>(`signup`, action.payload)
        response.subscribe({
          next: async ({accessToken}) => {
            this.cookie.setItem(environment.PATH_ACCESS_TOKEN, accessToken);
            await this.router.navigate(['/']);
          },
          error: (data: HttpErrorResponse ) => {
            this.toast.openSnackBar(data.error.error, 'error-snackbar');
            this.store.dispatch(signupFailure({ message: data.error.error }))
          },
        })
        return response
      }),
      tap(({ accessToken }) => this.store.dispatch(signupSuccess({ accessToken }) )),
      map(({ accessToken }) => signupSuccess({ accessToken })
    ))
  )

  logoutEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(logout),
      tap(() => {
        this.cookie.removeItem(environment.PATH_ACCESS_TOKEN);
        this.router.navigate(['account/login']);
      })
    )
  )

}
