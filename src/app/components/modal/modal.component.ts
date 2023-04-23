import { ProfileRequestsComponent } from './../../pages/profile/profile-requests/profile-requests.component';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductList } from 'src/app/core/model/interfaces/Product';
import { Component, Injectable, OnInit, Inject } from '@angular/core'
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CartModel } from 'src/app/core/domain/model/logistics/cart';
import { ProductModel } from '../products-cart/imports';

export interface DialogData {
  product: { quantity: number; product: CartModel; }[];
}

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
@Injectable()
export class ModalComponent implements OnInit {

  displayedColumns: string[] = ['produtos', 'quantidade', 'price', 'valor'];

  products:  { quantity: number; product: ProductModel; }[];
  totalPrice: number = 0;

  constructor (private modalService: NgbModal,
    public dialogRef: MatDialogRef<ProfileRequestsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  )
  {

    this.products = data.product as any as { quantity: number; product: ProductModel; }[]
    const totalPrice = this.products.map(t => t.product.price * t.quantity).reduce((acc, value) => acc + Number(value), 0);

    this.totalPrice = totalPrice;
    // this.totalPrice = data.product.map(t => t.price * t.quantity).reduce((acc, value) => acc + Number(value), 0);
  }


  ngOnInit(): void { }
}

