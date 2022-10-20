import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Injectable, Component } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(public dialog: MatDialog) {}

  openModal(component: any, data?: any) {
    const dialogRef = this.dialog.open(component , {
      width: '50%',
      data: { data }
    });
    return dialogRef;
  }

}
