import { CartService } from './../services/cart.service';
import { Resolve } from '@angular/router';
import { ProductsDisplay } from 'src/app/core/model/interfaces/Product';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartResolver implements Resolve<ProductsDisplay[]> {
  constructor(
    private cartService: CartService
  ) { }

  resolve() {
    return this.cartService.productInCart;
  }

}
