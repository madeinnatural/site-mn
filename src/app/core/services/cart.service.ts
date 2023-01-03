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
    const productDisplay: ProductsDisplay = {
      id: product.id,
      quantityInCart: 0,
      subTotal: 0,
      product: product,
      typeCharge: 'unit'
    };

    if (this.productInCart.length > 0) {
      const productCart = this.productInCart.find(item => item.id === product.id);
      if(productCart) {
        productDisplay.quantityInCart = productCart.quantityInCart;
        productDisplay.subTotal = productCart.subTotal;
        productDisplay.typeCharge = productCart.typeCharge;
      }
    }

    return productDisplay;
  }

  addProductInCart(product: ProductsDisplay) {
    const productCart = this.productInCart.find(item => item.id === product.id);
    if(productCart) {
      productCart.quantityInCart = product.quantityInCart;
      productCart.subTotal = product.subTotal;
    } else {
      this.productInCart.push(product);
    }
    this.changeCartData();
  }

  totalPrice(): number {
    return this.productInCart.reduce((total, item) => total + item.subTotal, 0);
  }

  totalQuantity(): number {
    return this.productInCart.reduce((total, item) => total + item.quantityInCart, 0);
  }

  changeCartData () {
    const totalPrice = this.totalQuantity();
    const quantity = this.totalPrice();
    this.global.counterBar.emit({totalPrice,quantity})
  }

}
