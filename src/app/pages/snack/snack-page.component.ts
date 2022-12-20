import { ProductList } from 'src/app/core/model/interfaces/Product';
import { GlobalEventService } from './../../core/global/global.service';
import { CookieService } from '@ngx-toolkit/cookie';
import { SnackProduct, CartProduct } from './../../core/model/interfaces/Product';
import { ActivatedRoute } from '@angular/router';
import { Component} from '@angular/core';
import { SnackService } from '../../core/services/SnackService';

interface TableSnackProduct {
  product: SnackProduct,
  quantity: number,
  subTotal: number,
  typeCharge?: 'box' | 'unit' | 'none';
}


@Component({
  templateUrl: './snack-page.component.html',
  styleUrls: ['./snack-page.component.scss'],
  providers: [SnackService]
})
export class SnackPage {

  productsTable: TableSnackProduct[] = [];

  termo: string = '';
  keyPress(event: any){
    if (event.key == 'Enter') {}
  }

  constructor(
    public sanckService: SnackService,
    public router: ActivatedRoute,
    public cookie: CookieService,
    public global: GlobalEventService,
  ) {}

  addProductQuantity(product: TableSnackProduct) {
    product.quantity++;
    if (product.typeCharge == 'box') {
      product.subTotal = product.product.price.box_30 * product.quantity;
    } else if (product.typeCharge == 'unit') {
      product.subTotal = product.product.price.unitary * product.quantity;
    }

    this.addSnackProductLS(product);
  }

  removeProductQuantity(product: TableSnackProduct) {
    if (product.quantity > 1) {
      product.quantity--;
      if (product.typeCharge == 'box') {
        product.subTotal = product.product.price.box_30 * product.quantity;
      } else if (product.typeCharge == 'unit') {
        product.subTotal = product.product.price.unitary * product.quantity;
      }
    } else {
      product.subTotal = 0;
      product.quantity = 0;
      product.typeCharge = undefined;
    }
  }


  transformerSnackProductinProductList(item: TableSnackProduct) {
    return new ProductList(
      item.product.id,
      item.product.display_name,
      item.typeCharge == 'box' ? Number(item.product.weight.box): item.product.weight.kg,
      item.typeCharge == 'box' ? item.product.price.box_30 : item.product.price.unitary,
      item.quantity,
      item.typeCharge == 'box' ? item.product.price.box_30 * item.quantity : item.product.price.unitary * item.quantity,
      'snack',
      item.product.secondary_category,
    );
  }

  addSnackProductLS(product: TableSnackProduct) {
    const productList = this.transformerSnackProductinProductList(product);
    const cartJson = this.cookie.getItem(this.global.CART_PATH);

    if (cartJson) {
      const cart: CartProduct[] = JSON.parse(cartJson);
      const productCart = cart.find((item) => item.product.id == product.product.id);
      if (productCart) {
        productCart.quantity = product.quantity;
        productCart.parcial_price = product.subTotal;
      } else {
        cart.push({
          id: product.product.id,
          quantity: product.quantity,
          parcial_price: product.subTotal,
          product: productList,
        });
      }
      this.cookie.setItem(this.global.CART_PATH, JSON.stringify(cart));
    } else {
      const cart: CartProduct[] = [{
        id: product.product.id,
        quantity: product.quantity,
        parcial_price: product.subTotal,
        product: productList,
      }];
      this.cookie.setItem(this.global.CART_PATH, JSON.stringify(cart));
    }

  }

  changeTypeCharge(product: TableSnackProduct, typeCharge: 'box' | 'unit') {
    product.typeCharge = typeCharge;
    if (product.typeCharge == 'box') {
      product.subTotal = product.product.price.box_30 * product.quantity;
    } else if (product.typeCharge == 'unit') {
      product.subTotal = product.product.price.unitary * product.quantity;
    }

    this.addProductQuantity(product);
  }

}

