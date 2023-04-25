import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductModel } from '../../products-cart/imports';
import { CartItem, CartModel } from 'src/app/core/domain/model/logistics/cart';

interface DialogData {
  items: CartItem[]
}

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalProductComponent implements OnInit {

  displayedColumns: string[] = ['produtos', 'quantidade', 'price', 'valor'];
  items: CartItem[] = [];
  totalPrice: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialog: DialogData,
  ) {
    this.items = dialog.items;
    this.totalPrice = this.items.reduce((acc, item) => acc + ( item.product.price * item.quantity ) , 0);
  }

  ngOnInit(): void {
  }

}
