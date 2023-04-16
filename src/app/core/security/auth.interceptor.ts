import {Injectable} from '@angular/core';
import { CookieService } from '@ngx-toolkit/cookie';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private cookie: CookieService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.cookie.getItem(environment.PATH_ACCESS_TOKEN);
    if (!token) return next.handle(req);
    const authReq = req.clone({
      setHeaders: {
        "Content-Type": "application/json",
        "x-access-token" : `${token}`,
      },
      url: environment.apiUrl + req.url,
    });
    return next.handle(authReq);
  }
}
