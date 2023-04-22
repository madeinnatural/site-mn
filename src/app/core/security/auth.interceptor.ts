import {Injectable} from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from '@ngx-toolkit/cookie';

import { environment } from '../../../environments/environment';
import { BreadCrumb, addBreadcrumb } from 'src/app/states-handler/store/breadcrumb.store';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private cookie: CookieService,
    private router: Router,
    private store: Store<{ breadcrumb: BreadCrumb[] }>
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.cookie.getItem(environment.PATH_ACCESS_TOKEN);
    if (!token) {
      const reqNext = req.clone({
        setHeaders: {
          "Content-Type": "application/json",
        },
        url: environment.baseUrl + req.url,
      });
      return next.handle(reqNext);
    }
    const authReq = req.clone({
      setHeaders: {
        "Content-Type": "application/json",
        "x-access-token" : `${token}`,
      },
      url: environment.baseUrl + req.url,
    });
    return next.handle(authReq);
  }
}
