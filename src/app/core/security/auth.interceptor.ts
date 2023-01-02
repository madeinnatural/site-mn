import { Observable } from 'rxjs';
import { GlobalEventService } from 'src/app/core/services/global.service';
import { CookieService } from '@ngx-toolkit/cookie';
import {Injectable} from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private cookie: CookieService,
    private global: GlobalEventService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.getToken();
    if (token) return next.handle(req);
    const authReq = req.clone({setHeaders: {authorization: `Bearer ${token}`}});
    return next.handle(authReq);
  }

  getToken() {
    return this.cookie.getItem(this.global.AUTH_TOKEN_COOKIE);
  }
}
