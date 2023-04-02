import { Router, NavigationExtras } from '@angular/router';
import { UserLogin } from './../../core/model/interfaces/User';
import { AccountService } from './../../core/account/account.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {

  dataLogin?: UserLogin;
  type: 'registration' | 'login' = 'login';

  constructor(
    private accountService: AccountService,
    private router: Router,
  ) {
    const dataNavigatio = this.router.getCurrentNavigation();
    if (dataNavigatio) {
      const { type } = dataNavigatio.extractedUrl.queryParams;
      if (type) { this.type = type }
      else { if (this.router.url == 'login') this.type = 'login' }
    } else {
      this.type = 'login';
    }
    accountService.loginActiver(true)
  }

  ngOnInit(): void {
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
