import { ToastComponent } from './../components/toast/toast.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalAlertService {

  constructor(
    private matSnackBar: MatSnackBar
  ) { }

  alertError(error: any) {
    console.log('ERRS', error);
    this.alertErrorSnackBar(error);
  }

  private alertErrorSnackBar(errorMsg: string) {
    this.matSnackBar.openFromComponent(ToastComponent, {
      duration: 3000,
      data: errorMsg,
      verticalPosition: 'bottom',
      panelClass: ['error-snackbar'],
      horizontalPosition: 'right',
    });
  }
}
