import { GlobalEventService } from '../services/global.service';
import { CookieService } from '@ngx-toolkit/cookie';
import { Injectable } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { HttpErrorResponse } from '../domain/model/http/http.model';

import { environment } from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class ServerService {

  constructor(
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


  async submit<T>(
    url: string,
    params: any = {},
    options: {
      type?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    } = {}
  ): Promise<T> {
    let obs: Observable<T>;
    switch (options.type) {
      case 'GET':
        obs = this.http.get<any>(url);
      break;
      case 'DELETE':
        obs = this.http.delete<any>(url);
      break;
      case 'PUT':
        obs = this.http.put<any>(url, params);
      break;
      case 'POST':
        obs = this.http.post<any>(url, params);
      break;
      default:
        obs = this.http.get<any>(url);
      break;
    }

    return await new Promise((resolve, reject) => {
      obs.subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (error) => {
          let message = error.error.error || error.error.message;
          if (message == 'Unauthorized') message = 'Credenciais inválidas';
          this.toast.openSnackBar(message, 'error-snackbar');
          reject(error);
        },
        complete: () => {},
      });
    });
  }

}
