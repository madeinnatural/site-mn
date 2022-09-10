import { AccountService } from './core/account/account.service';
import { LoginService } from './core/account/login.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  hidderHeader = false;

  constructor( private accountService: AccountService) {
    this.accountService.hidderHeaderFooter.subscribe(hideHead => {
      this.hidderHeader = hideHead;
    })
  }

}
