import { GlobalEventService } from '../services/global.service';
import { CookieService } from '@ngx-toolkit/cookie';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../core/services/toast.service';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { catchError, from, map, Observable, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '../domain/model/http/http.model';

import { environment } from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class ServerService {

  constructor(
    private cookies :CookieService,
    private global  :GlobalEventService,
    private router :Router,
    public http    :HttpClient,
    public toast   :ToastService
  ) {}

  post<T>(url: string, data: any, options?: any): Observable< HttpEvent<T> | null> {
    return this.http.post<T>(url, data, options).pipe(
      catchError((error: HttpErrorResponse) => {
        this.toast.openSnackBar(error.error.error, 'error-snackbar');
        return of(null);
      })
    )
  }

  public getToken(): string | null {
    const token = this.cookies.getItem(this.global.AUTH_TOKEN_COOKIE);
    if (token) return token;
    return null;
  }

  private async submit(
    method: string,
    params: any = {},
    options: {
      type?: 'GET' | 'POST' | 'PUT' | 'DELETE';
      endPoint?: string;
    } = {}
  ): Promise<any> {
    if (!options.type) options.type = 'GET';
    let methodUrl: string;
    if (options.endPoint) {
      methodUrl = environment.baseUrl + options.endPoint;
    } else {
      methodUrl = environment.baseUrl;
    }
    methodUrl += method;

    const token = this.getToken();
    let httpOptions: any;

    if (token) {
      httpOptions = {
        headers: new HttpHeaders({
          Authorization: token,
          AppVersion: '9999.99.99',
        }),
      };
    } else {
      httpOptions = {
        headers: new HttpHeaders({
          AppVersion: '9999.99.99',
        }),
      };
    }
    httpOptions.observe = 'response';

    if (options.type == 'GET' || options.type == 'DELETE') {
      let paramKeys = Object.keys(params);

      if (paramKeys.length) {
        methodUrl += '?';
        paramKeys.forEach((key) => {
          if (Array.isArray(params[key])) {
            let a = params[key];
            key = key + '[]';
            a.forEach((item: string) => {
              methodUrl += key + '=' + item + '&';
            });
          } else {
            methodUrl += key + '=' + params[key] + '&';
          }
        });
        methodUrl = methodUrl.substr(0, methodUrl.length - 1);
      }
    }

    let obs: Observable<any>;
    switch (options.type) {
      case 'GET':
        obs = this.http.get(methodUrl, httpOptions);
        break;
      case 'DELETE':
        obs = this.http.delete(methodUrl, httpOptions);
        break;
      case 'PUT':
        obs = this.http.put(methodUrl, params, httpOptions);
        break;
      case 'POST':
        obs = this.http.post(methodUrl, params, httpOptions);
        break;
    }

    return await new Promise((resolve, reject) => {
      obs.subscribe(
        (response) => {
          resolve(response.body);
        },
        (error) => {
          if (
            error.status == 401 &&
            this.cookies.getItem(this.global.AUTH_TOKEN_COOKIE)
          ) {
            this.cookies.removeItem(this.global.AUTH_TOKEN_COOKIE);
            this.cookies.removeItem(this.global.SAVED_USER_COOKIE);
          }
          reject(error);
        }
      );
    });
  }

}
