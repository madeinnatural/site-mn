import { logout } from './../store/account.store';
import { switchMap, tap, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { login, loginFailure, loginSuccess, signup, signupFailure, signupSuccess } from '../store/account.store';

import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { CookieService } from '@ngx-toolkit/cookie';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ToastComponent } from 'src/app/components/toast/toast.component';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from 'src/app/core/domain/model/http/http.model';

@Injectable({
  providedIn: "root"
})
export class AccountEffectsService {

  constructor(
    private http     :HttpClient,
    private actions$ :Actions,
    private store    :Store<any>,
    private snackBar :MatSnackBar,
    private cookie   :CookieService,
    private router   :Router
  ) {}

  durationInSeconds = 5;
  openSnackBar(msg: string) {
    const config = new MatSnackBarConfig();
    config.duration = this.durationInSeconds * 1000,
    config.panelClass = ['error-snackbar']
    config.horizontalPosition = 'end';
    config.verticalPosition = 'top';
    config.data = msg;
    this.snackBar.openFromComponent(ToastComponent, config);
  }

  loginEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(login),
      switchMap((action) => {
        const response = this.http.post<{accessToken: string}>(`login`, action.payload)
        response.subscribe({
          next: ({accessToken}) => {
            this.cookie.setItem(environment.PATH_ACCESS_TOKEN, accessToken);
            this.router.navigate(['/']);
          },
          error: (error: HttpResponse) => {
            this.openSnackBar('Email ou senha não identificado');
            this.store.dispatch(loginFailure({ message: 'Email ou senha não identificado' }))
          },
        })
        return response
      }),
      tap(({ accessToken }) => this.store.dispatch(loginSuccess({ accessToken }) )),
      map(({ accessToken }) => loginSuccess({ accessToken }))
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
            this.openSnackBar(data.error.error);
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
        this.router.navigate(['/']);
      })
    )
  )

}
