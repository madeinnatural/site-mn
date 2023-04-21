import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertoInterface } from './core/model/interfaces/Alert';
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

  counterBarActive: boolean = false;
  counterBarData = {
    totalPrice: 0,
    quantity: 0,
  }

  loading = false;
  constructor(
    public snackBar: MatSnackBar,
    public router: Router
  ) {
    // router.events.subscribe((event: Event) => {
    //   switch (true) {
    //     case event instanceof NavigationStart: {
    //       this.loading = true;
    //       break;
    //     }
    //     case event instanceof NavigationEnd:
    //     case event instanceof NavigationCancel:
    //     case event instanceof NavigationError: {
    //       this.loading = false;
    //       break;
    //     }
    //     default: {
    //       break;
    //     }
    //   }
    // });
  }

}
