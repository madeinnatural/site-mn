import { GlobalEventService } from 'src/app/core/services/global.service';
import { ProductRequest, ProductsDisplay, ProductResponse } from './../model/interfaces/Product';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  productInCart: ProductsDisplay[] = []

  constructor(
    public global: GlobalEventService,
  ) { }

  compareCart(product: ProductResponse): ProductsDisplay {
    return '' as any
  }

  addProductInCart(product: ProductsDisplay) {

  }

  totalPrice(): number {
    return 0;
  }

  totalQuantity(): number {
    return 0;
  }

  changeCartData () {
    const totalPrice = this.totalQuantity();
    const quantity = this.totalPrice();
    this.global.counterBar.emit({totalPrice,quantity})
  }

}
