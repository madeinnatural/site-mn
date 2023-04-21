import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';

interface ToastStatus {
  success: string;
  error: string;
  warning: string;
}
interface DataToast {
  message: string;
  status: ToastStatus;
};

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: DataToast,
  ) {}
}
