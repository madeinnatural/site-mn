import { ProductList } from 'src/app/core/model/interfaces/Product';
import { CartProduct } from './../model/interfaces/Product';
import { ServerService } from './../server/server.service';
import { Snack, SnackProduct } from './../model/interfaces/Product';
import { SnackAbstract } from 'src/app/core/model/classes/SnackAbstract';
import { Injectable } from '@angular/core';
import { GlobalEventService } from '../global/global.service';
import { CookieService } from '@ngx-toolkit/cookie';

@Injectable({providedIn: 'root'})
export class SnackService extends SnackAbstract {

  private _productInCart: SnackProduct[] = [];

  get productInCart () {
    return this._productInCart;
  }

  set productInCart (list: Snack[]) {
    const products: SnackProduct[] = list.map((item) => {
      const product = item as SnackProduct;
      product.id = list.length;
      product.price = item.price * item.quantity * item.product_weight;
      return product;
    });
    this._productInCart = products;
  }

  constructor(
    public server: ServerService,
    public cookie: CookieService,
    public global: GlobalEventService,
  ) {
    super();
  }

  decrementSnackQuantity (id: number) {
    this.decrement(id);
  }

  // Funções de listagem
  protected increment (id: number) {
    const product = this._productInCart.find((item) => item.id === id);
    if (product) {
      if (product.quantity <= 0) {
        product.quantity += 1;
        product.price = product.price + product.product_weight;
      } else {
        this.add(product);
      }
    } else {
      console.error('Produto não encontrado');
    }
  }

  protected decrement (id: number) {
    const product = this._productInCart.find((item) => item.id === id);
    if (product) {
      if ( product.quantity > 1 ) {
        product.quantity -= 1;
        product.price = product.price - product.product_weight;
      } else {
        this.remove(product);
      }
    } else {
      console.error('Produto não encontrado');
    }
  }

  // Funções de carrinho
  protected add (product: SnackProduct) {
    this.productInCart.push(product);
  }

  protected remove (product: SnackProduct) {
    this.productInCart = this.productInCart.filter((item) => item !== product);
  }

  async refresh() {
    this.productInCart = [{
        display_name: 'Coca-Cola',
        name: 'coca-cola',
        price: 5.00,
        product_weight: 2,
        quantity: 0,
        secondary_category: 'Bebidas',
    }]
    // this.productInCart = await this.server.getSnacks();
  }

  // Funções de carrinho Local Storage
  get cart(): CartProduct[] {
    const cart = this.cookie.getItem(this.global.CART_PATH);
    if (cart) {
      const cartList: CartProduct[] = JSON.parse(cart);
      return cartList;
    } else {
      return [];
    }
  }

  set cart(list: CartProduct[]) {
    if (list) {
      this.cookie.setItem(this.global.CART_PATH, JSON.stringify(list), {expires: 1});
    }
  }

  private getParcialPrice (price: number, quant: number, weigh: number) {
    return price * quant * weigh;
  }

  protected incrementCart(id: number): void {
    const cart = this.cart;
    if (cart) {
      const product = cart.find((item) => item.id === id);
      if (product) {
        if (product.quantity > 0 ) {
          product.quantity += 1;
          product.parcial_price = this.getParcialPrice(product.product.price, product.product.quantity, product.product.weight);
          this.cart = cart;
        } else {
          product.quantity = 0;
          product.parcial_price = this.getParcialPrice(product.product.price, product.product.quantity, product.product.weight);
          this.cart = cart;
        }
      } else {
        console.error('Produto não encontrado');
      }
    } else {
      const product = this._productInCart.find((item) => item.id === id);
      if (product) {
        const cartProduct: CartProduct = {
          id: product.id,
          quantity: product.quantity + 1,
          parcial_price: this.getParcialPrice(product.price, product.quantity, product.product_weight),
          product: {
            id: this.cart.length,
            product_name: product.name,
            price: product.price,
            quantity: product.quantity,
            weight: product.product_weight,
            total: product.price * product.quantity * product.product_weight,
          },
        };
        this.cart = [cartProduct];
      } else {
        console.error('Produto não encontrado');
      }
    }
  }

  protected decrementCart(id: number): void {

  }

  protected removeCart(product: SnackProduct): void {

  }

  protected addCart(product: SnackProduct): void {

  }

  protected refreshCart(): void {

  }


}
