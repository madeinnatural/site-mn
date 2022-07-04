import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../account/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthQuard implements CanActivate {

  constructor(
    private login: LoginService,
    private router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    return true
    

    this.router.navigate(['/login']);

    return false;
  }

}
