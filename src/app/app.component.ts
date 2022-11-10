import { GlobalAlertComponent } from './components/global-alert/global-alert.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertoInterface } from './core/model/Alert';
import { GlobalEventService } from './core/global/global.service';
import { GlobalAlertService } from './core/global-alert.service';
import { AccountService } from './core/account/account.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  hidderHeader = false;
  alert = false;
  alertData?: AlertoInterface;

  constructor(
    private accountService: AccountService,
    public globalEventService: GlobalEventService,
    public globalAlertService: GlobalAlertService,
    public snackBar: MatSnackBar
    ) {
    this.accountService.hidderHeaderFooter.subscribe(hideHead => {
      this.hidderHeader = hideHead;
    })

    this.globalEventService.errorPurchase.subscribe( (error) => {
      const { text, showError } = error;
      this.globalAlertService.alertError(text);
    })

    this.globalEventService.goAlert.subscribe( (alert: AlertoInterface ) => {
      this.alertData = alert;

      console.log('alertData', this.alertData);

      const openSnackBar = () => {
        this.snackBar.openFromComponent(GlobalAlertComponent, {
          duration: alert.duration,
          panelClass: ['error-snackbar'],
          horizontalPosition: 'right',
          data: alert
        });
      }

      openSnackBar();

    });
  }

}
