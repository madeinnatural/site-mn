import { GlobalEventService } from './core/global/global.service';
import { GlobalErrorService } from './core/global/global-error.service';
import { GlobalAlertService } from './core/global-alert.service';
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

  constructor(
    private accountService: AccountService,
    public globalEventService: GlobalEventService,
    public globalAlertService: GlobalAlertService,
    ) {
    this.accountService.hidderHeaderFooter.subscribe(hideHead => {
      this.hidderHeader = hideHead;
    })

    this.globalEventService.errorPurchase.subscribe( (error) => {
      const { text, showError } = error;
      this.globalAlertService.alertError(text);
    })
  }

}
