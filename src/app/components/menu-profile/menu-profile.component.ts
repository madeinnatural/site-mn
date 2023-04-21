import { Router } from '@angular/router';
import { AccountService } from './../../core/account/account.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-profile',
  templateUrl: './menu-profile.component.html',
  styleUrls: ['./menu-profile.component.scss']
})
export class MenuProfileComponent {

  constructor(
    public accountService: AccountService,
    public router: Router
  ) {
  }

  logOut() {
    this.accountService.logout();
  }

  replace(url?: string) {
    this.router.navigate(['profile/' + url]);
  }

}
