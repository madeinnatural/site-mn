import { AccountService } from './../../core/account/account.service';
import { Router } from '@angular/router';
import { ServerService } from './../../core/server/server.service';
import { Component, OnInit } from '@angular/core';
import User from 'src/app/core/model/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  constructor(
    public accountService: AccountService,
    public router: Router
  ) {
  }

  logOut() {
    this.accountService.logout();
    this.router.navigate(['/'])
  }

  replace(url?: string) {
    console.log(this.router.url)
  }
}
