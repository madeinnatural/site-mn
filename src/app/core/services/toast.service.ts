import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ToastComponent } from '../../components/toast/toast.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private config   :MatSnackBarConfig,
    private snackBar :MatSnackBar
  ) {
    this.config.duration = 5000;
    this.config.horizontalPosition = 'end';
    this.config.verticalPosition = 'top';
  }

  openSnackBar(msg: string, panel:'error-snackbar' | 'success-snackbar' | 'warning-snackbar' = 'success-snackbar') {
    this.config.horizontalPosition = 'end';
    this.config.verticalPosition = 'top';
    this.config.data = {
      message: msg,
      status: {
        success :panel === 'success-snackbar',
        warning :panel === 'warning-snackbar',
        error   :panel === 'error-snackbar',
      }
    }
    this.snackBar.openFromComponent(ToastComponent, this.config);
  }
}
