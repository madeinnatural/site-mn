import { GlobalErrorService } from '../../core/services/global-error.service';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Component, OnInit, ChangeDetectionStrategy, Input, Inject } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastComponent implements OnInit {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: string
  ) {
    this.message = data;
  }

  message: string = '';

  ngOnInit(): void {
  }

}
