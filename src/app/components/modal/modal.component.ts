import { MatDialogRef } from '@angular/material/dialog';
import { Component, Injectable, Inject } from '@angular/core'
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProfileRequestsComponent } from './../../pages/profile/profile-requests/profile-requests.component';
import { CartModel } from '../../core/domain/model/logistics/cart';
import { ModalService } from '../products-cart/imports';
import { ModalProductComponent } from './modal-product/modal-product.component';

export interface DialogData {
  carts: CartModel[]
}

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
@Injectable()
export class ModalComponent {

  displayedColumns: string[] = ['produtos', 'quantidade', 'price', 'valor'];
  carts:  CartModel[] = [];
  totalPrice: number = 0;

  constructor (
    private modalService: ModalService,
    public dialogRef: MatDialogRef<ProfileRequestsComponent>,
    @Inject(MAT_DIALOG_DATA) public dialog: DialogData,
  )
  {
    this.carts = dialog.carts;
    this.totalPrice = this.carts.reduce((acc, cart) => acc + cart.total, 0);
  }

  openDetail(items: any) {
    const modalRef = this.modalService.openModal(ModalProductComponent, { items: items.cart.cartItem });
  }
}

