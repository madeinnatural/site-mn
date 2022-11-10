import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { AlertoInterface } from './../../core/model/Alert';
import { Component, Inject, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-global-alert',
  templateUrl: './global-alert.component.html',
  styleUrls: ['./global-alert.component.scss']
})
export class GlobalAlertComponent {

  @Input() data?: AlertoInterface;

  danger = 'assets/img/error.svg';
  success = 'assets/img/sucess.svg';
  warning = 'assets/img/warning.svg';

  icon = '';

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public requestData: AlertoInterface
  ) {
    this.data = requestData;
    if (requestData.type == 'danger') {
      this.icon = this.danger;
    } else if (requestData.type == 'success') {
      this.icon = this.success;
    } else {
      this.icon = this.warning;
    }
  }

}
