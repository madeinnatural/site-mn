import { UserService } from './../../core/global/user.service';
import User, { UserLogin, UserRegister } from './../../core/model/User';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';
import { AccountService } from './../../core/account/account.service';
import { LoginService } from './../../core/account/login.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {

  dataLogin?: UserLogin;
  type: 'registration' | 'login' = 'login';

  constructor(
    private formBuilder: FormBuilder,
    private authService: LoginService,
    private accountService: AccountService,
    private router: Router,
  ) {

    const dataNavigatio = this.router.getCurrentNavigation();

    if (dataNavigatio) {

      const { type } = dataNavigatio.extractedUrl.queryParams;

      if (type) {
        this.type = type;
      } else {

        if (this.router.url == 'login') {
          this.type = 'login';
        }

      }

    } else {
      this.type = 'login';
    }

    accountService.loginActiver(true)

  }

  ngOnInit(): void {
  }

  register(dataRegister: UserRegister) {
    this.accountService.reginterUser(dataRegister);
  }

  login(dataLogin: UserLogin) {
    this.authService.loginUser({ email: dataLogin.email, password: dataLogin.password});
  }

  changePage(type: 'login' | 'registration') {

    const extra: NavigationExtras = {
      fragment: type,
      replaceUrl: true,
      queryParamsHandling: 'merge'
    }
    this.router.navigate([], extra);
    this.type = type;
  }

  ngOnDestroy() {
    this.accountService.loginActiver(false);
  }


}
