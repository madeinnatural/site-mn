import { GlobalEventService } from './../global/global.service';
import { AccountService } from './../account/account.service';
import { ServerService } from './../server/server.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../account/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthQuard implements CanActivate {

  constructor(
    private serverService: ServerService,
    private login: LoginService,
    private router: Router,
    private account: AccountService,
    private globalEventService: GlobalEventService
  ) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

    const token = this.serverService.getToken();


    if (token) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }


    return true

    // try {
    //   if (token) {
    //     const result: any = await this.account.verifyToken(token)
    //     if (true) {
    //       return true
    //     } else {
    //       return await this.router.navigate(['home'])
    //     }

    //   }
    // } catch (error) {
    //   return await this.router.navigate(['login']);
    // }

    // return await this.router.navigate(['login']);

  }

}
