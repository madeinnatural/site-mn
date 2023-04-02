import { HttpClient } from '@angular/common/http';
import { CookieService } from '@ngx-toolkit/cookie';
import { GlobalEventService } from './../services/global.service';
import { ServerService } from '../services/server.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree, RouterModule } from '@angular/router';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthQuard implements CanActivate {

  token: string | null = null;

  constructor(
    public serverService: ServerService,
    private router: Router,
    private cookieService: CookieService,
    private globalEventService: GlobalEventService,
    private httpClient: HttpClient
  ) {this.token = cookieService.getItem(globalEventService.AUTH_TOKEN_COOKIE)}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      this.verify().subscribe({
        next: (response: any) => {
          resolve(true)
        },
        error: (error: any) => {
          this.globalEventService.goAlert.emit({type: 'danger', text: 'Você não tem permissão para acessar essa página!', duration: 5000});
          reject(this.router.navigate(['/login']))
          },
      });
    });
  }

  private verify = () => {
    this.token = this.cookieService.getItem(this.globalEventService.AUTH_TOKEN_COOKIE)
    if (!this.token) {
      this.router.navigate(['/login']);
      throw new Error('Usuário não autenticado');
    }
    return this.httpClient.get(environment.baseUrl + 'token/verify', {headers: { Authorization: this.token }});
  }

}
