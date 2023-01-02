import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { GlobalAlertComponent } from './components/global-alert/global-alert.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertoInterface } from './core/model/interfaces/Alert';
import { GlobalEventService } from './core/services/global.service';
import { GlobalAlertService } from './core/global-alert.service';
import { AccountService } from './core/account/account.service';
import { Component } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  faCoffee = faCoffee;

  hidderHeader = false;
  alert = false;
  alertData?: AlertoInterface;
  loading = false;

  constructor(
    private accountService: AccountService,
    public globalEventService: GlobalEventService,
    public globalAlertService: GlobalAlertService,
    public snackBar: MatSnackBar,
    public router: Router
    ) {

      router.events.subscribe((event: Event) => {
        switch (true) {
          case event instanceof NavigationStart: {
            this.loading = true;
            break;
          }

          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            this.loading = false;
            break;
          }
          default: {
            break;
          }
        }
      });


    this.accountService.hidderHeaderFooter.subscribe(hideHead => {
      this.hidderHeader = hideHead;
    })

    this.globalEventService.errorPurchase.subscribe( (error) => {
      const { text, showError } = error;
      this.globalAlertService.alertError(text);
    })

    this.globalEventService.goAlert.subscribe( (alert: AlertoInterface ) => {
      this.alertData = alert;

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
