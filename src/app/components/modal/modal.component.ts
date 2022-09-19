import { ProfileRequestsComponent } from './../../pages/profile/profile-requests/profile-requests.component';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductList } from 'src/app/core/model/Product';
import { Component, Injectable, OnInit, Inject } from '@angular/core'
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  product: ProductList[];
}

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
@Injectable()
export class ModalComponent implements OnInit {

  displayedColumns: string[] = ['produtos', 'quantidade', 'price', 'valor'];

  products: ProductList[] = [];
  totalPrice: number = 0;

  constructor (private modalService: NgbModal,
    public dialogRef: MatDialogRef<ProfileRequestsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  )
  {
    this.products = data.product;
    this.totalPrice = data.product.map(t => t.price * t.quantity).reduce((acc, value) => acc + Number(value), 0);
  }


  ngOnInit(): void { }
}

