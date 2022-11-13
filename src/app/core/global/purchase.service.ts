import { GlobalEventService } from './global.service';
import { ProductService } from './product.service';
import { ServerService } from './../server/server.service';
import { ProductList, Purchase } from './../model/Product';
import { CookieService } from '@ngx-toolkit/cookie';
import { Injectable } from '@angular/core';
import { Item } from '../model/Product';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
  constructor(
    public cookieService: CookieService,
    public serverService: ServerService,
    public productService: ProductService,
    public globalEventService: GlobalEventService,
    private server: ServerService
  ) {}

  async getPurchase(id: number) {
    return this.server.getPurchase(id);
  }

  async finishPurchase() {
    try {
      const cart: any = this.productService.getCart()
      .filter( item => item.product.quantity > 0 )
      .map(item => {
        return {
          product_name: item.product.product_name,
          weight: item.product.weight,
          category: item.product.categoria,
          provider_primary: item.product.provider_primary,
          quantity: item.product.quantity,
          price: item.product.price
        }
      });

      return this.server.finishPurchase(cart);

    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  historyPurchase() {
    return this.serverService.purchaseHistory();
  }

  totalPrice() {
    const cart_jason = this.cookieService.getItem('cart');

    if (cart_jason) {
      const cart = this.getCartLocalStorage();

      let total = 0;
      for (let i = 0; i < cart.filter((e) => e.parcial_price > 0).length; i++) {
        total += cart[i].parcial_price;
      }

      return total;
    }

    return 0;
  }

  itemCount() {
    const cart_jason = this.cookieService.getItem('cart');

    if (cart_jason) {
      const cart = this.getCartLocalStorage();
      return cart.length;
    }

    return 0;
  }

  clearCart() {
    this.cookieService.removeItem('cart');
  }

  deleItem(item: Item) {
    const cart_json = this.cookieService.getItem('cart');

    if (cart_json) {
      const cart = this.getCartLocalStorage();

      if (cart.some((e) => e.id == item.id)) {
        cart[cart.findIndex((e) => e.id == item.id)].quantity -= 1;

        this.cookieService.setItem('cart', JSON.stringify(cart));
      }
    }
  }

  removeItem(item: Item) {
    // CASO JÁ EXISTA CARRINHO
    if (this.cookieService.hasItem('cart')) {
      const cart = this.getCartLocalStorage();

      // VERIFICA SE EXISTE ALGUM ITEM COM O ID IDENTICO.
      if (cart.some((current_item) => current_item.id == item.id)) {
        cart[cart.findIndex((e) => e.id == item.id)].product.quantity -= 1;

        const count_item = cart[cart.findIndex((e) => e.id == item.id)].product.quantity;

        const current_price_item = cart[cart.findIndex((e) => e.id == item.id)].product.price

        cart[cart.findIndex((e) => e.id == item.id)].product.price -= current_price_item;

        if (count_item == 0) {
          cart[cart.findIndex((e) => e.id == item.id)].parcial_price = 0;

          cart.splice(
            cart.findIndex((e) => e.id == item.id),
            1
          );

          this.productService.listProduct.splice(
            cart.findIndex((e) => e.id == item.id),
            1
          );

          this.cookieService.setItem('cart', JSON.stringify(cart));

          this.globalEventService.addItemCartEmit.emit('removel:cart');

          return;
        }

        // cart[cart.findIndex((e) => e.id == item.id)].quantity -= 1;
        // cart[cart.findIndex((e) => e.id == item.id)].parcial_price -=
        //   item.product.price;

        // this.productService.listProduct.splice(
        //   cart.findIndex((e) => e.id == item.id),
        //   1
        // );

        // cart.push({
        //   quantity: count_item,
        //   id: item.id,
        //   parcial_price: curret_price,
        //   product: item.product,
        // });

        this.globalEventService.addItemCartEmit.emit('removel:cart');

        this.cookieService.setItem('cart',JSON.stringify(cart));
      }
    }
  }

  addItemCart(item: Item) {
    const cart = this.getCartLocalStorage();
    // CASO JÁ EXISTA CARRINHO
    if (this.cookieService.hasItem('cart')) {
      // VERIFICA SE EXISTE ALGUM ITEM COM O ID IDENTICO.
      if (cart.some((current_item) => current_item.id == item.id)) {
        cart[cart.findIndex((e) => e.id == item.id)].product.quantity += 1;
        const count_item =
          cart[cart.findIndex((e) => e.id == item.id)].product.quantity;
        cart[cart.findIndex((e) => e.id == item.id)].product.price *=
          count_item;

        this.cookieService.setItem('cart', JSON.stringify(cart));
      } else {
        cart.push(item);
        this.cookieService.setItem('cart', JSON.stringify(cart));
      }
    } else {
      cart.push(item);
      this.cookieService.setItem('cart', JSON.stringify(cart));
    }
  }

  getProductCart(): Item[] | null {
    const cart = this.cookieService.getItem('cart');
    if (cart) {
      const cart_current = JSON.parse(cart);
      if (cart_current.length > 0) return cart_current;
    }

    return null;
  }

  private getCartLocalStorage(): Array<Item> {
    const data = this.cookieService.getItem('cart')
    if (data) {
      const current_cart_save = JSON.parse(
        data
      );

      return current_cart_save;
    }

    return [];
  }
}
