import { CookieService } from '@ngx-toolkit/cookie';
import { Router } from '@angular/router';
import { Item, ProductList } from './../model/Product';
import { Injectable, Input, OnInit } from '@angular/core';
import { ServerService } from '../server/server.service';
import { PurchaseService } from './purchase.service';
import { GlobalEventService } from './global.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  currentPage: number = 1;
  listProduct: Array<ProductList> = [];

  getProductCart(): Item[] {
    const cart = this.cookieService.getItem('cart');
    if (cart) {
      const cart_current = JSON.parse(cart);
      if (cart_current.length > 0) {
        return cart_current;
      } else {
        return [];
      }
    } else {
      return [];
    }
  }

  constructor(
    private server: ServerService,
    public purchaseService: PurchaseService,
    private globalEventService: GlobalEventService,
    private router: Router,
    private cookieService: CookieService
  ) {

  }

  async pullProductSever () {
    return new Promise (res => {
      const productCart = this.getProductCart();
    this.server.getProductListHome(0)
    .subscribe((produts) => {
      function current_amount(id: number) {
        let amount = 0;

        productCart?.forEach((productCart) => {
          if (id == productCart.id) {
            amount = productCart.amount;
          }
        });

        return amount;
      }

      const response = produts.map((e) => {
        return {
          id: e.id,
          product_name: e.product_name,
          price: e.price ? e.price : 0.0,
          provider_primary:
            e.provider_primary != '' ? e.provider_primary : 'INDEFINIDO',
          weight: e.weight ? e.weight : 0.0,
          amount: current_amount(e.id),
        };
      });

      this.listProduct = response;

      res(response);

    });
    })
  }

  private getCartLocalStorage(): Array<Item> | null {
    const data = this.cookieService.getItem('cart');
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }

  veryfy_product_in_cart(products: ProductList[]) {
    const productCart = this.getProductCart();

    function current_amount(id: number) {
      let amount = 0;

      productCart?.forEach((productCart) => {
        if (id == productCart.id) {
          amount = productCart.amount;
        }
      });

      return amount;
    }

    this.listProduct = products.map((e) => {
      return {
        id: e.id,
        product_name: e.product_name,
        price: e.price ? e.price : 0.0,
        provider_primary:
          e.provider_primary != '' ? e.provider_primary : 'INDEFINIDO',
        weight: e.weight ? e.weight : 0.0,
        amount: current_amount(e.id),
      };
    });
  }

  async showProductsAll() {
    this.server.getProductListHome(-1).subscribe((products) => {
      const productCart = this.getProductCart();

      function current_amount(id: number) {
        let amount = 0;

        productCart?.forEach((productCart) => {
          if (id == productCart.id) {
            amount = productCart.amount;
          }
        });

        return amount;
      }

      products.map((e) => {
        this.listProduct.push({
          id: e.id,
          product_name: e.product_name,
          price: e.price ? e.price : 0.0,
          provider_primary:
            e.provider_primary != '' ? e.provider_primary : 'INDEFINIDO',
          weight: e.weight ? e.weight : 0.0,
          amount: current_amount(e.id),
        });
      });
    });
  }

  initCart(product: ProductList) {
    this.addItemCart(product);
  }

  addItemCart(product: ProductList) {

      const item: Item = {
        id: product.id,
        amount: product.amount,
        parcial_price: product.price,
        product: product,
      };

      this.addItemLocalStorage(item);

  }

  addItemLocalStorage(item: Item) {
    let cart = this.getCartLocalStorage();
    // CASO JÁ EXISTA CARRINHO
    if (cart) {
      // VERIFICA SE EXISTE ALGUM ITEM COM O ID IDENTICO.
      if (cart && cart.findIndex((e) => e.id == item.id) > -1) {
        const index_current_product = cart.findIndex((e) => e.id == item.id);
        const index_current_list_product = this.listProduct.findIndex((e) => e.id == item.id);

        const current_cart = cart;
        current_cart[index_current_product].product.amount += 1;
        current_cart[index_current_product].amount += 1;

        const count_item = cart[index_current_product].product.amount;
        const value_item = cart[index_current_product].product.price;

        current_cart[index_current_product].parcial_price = count_item * value_item;

        this.listProduct[index_current_list_product].amount += 1;

        this.cookieService.setItem('cart', JSON.stringify(current_cart));

      } else {
        const index_current_list_product = this.listProduct.findIndex((e) => e.id == item.id);
          if (index_current_list_product > -1) {
            this.listProduct[index_current_list_product].amount += 1;
          }
        cart.push(item);
        this.cookieService.setItem('cart', JSON.stringify(cart));
      }
    } else {
      const new_cart: Array<Item> = []

      new_cart.push(item);

      this.cookieService.setItem('cart', JSON.stringify(new_cart));
    }

    this.globalEventService.addItemCartEmit.emit('add:cart');

  }

  removeItemLocalStoragee(item: Item) {
    const cart = this.getCartLocalStorage();
    // CASO JÁ EXISTA CARRINHO
    if (cart && this.cookieService.hasItem('cart')) {
      // VERIFICA SE EXISTE ALGUM ITEM COM O ID IDENTICO.
      if (cart.some((current_item) => current_item.id == item.id)) {
        cart[cart.findIndex((e) => e.id == item.id)].product.amount -= 1;
        cart[cart.findIndex((e) => e.id == item.id)].amount -= 1;
        cart[cart.findIndex((e) => e.id == item.id)].parcial_price -=
          cart[cart.findIndex((e) => e.id == item.id)].product.price;

        this.cookieService.setItem('cart', JSON.stringify(cart));
      } else {
        cart.push(item);
        this.cookieService.setItem('cart', JSON.stringify(cart));
      }
    } else {
      if (cart) {
        cart.push(item);
        this.cookieService.setItem('cart', JSON.stringify(cart));
      }
    }
  }

  removeItem(item: Item) {
    this.decreaseItemCart(item);

    this.globalEventService.addItemCartEmit.emit('removel:cart');
  }

  // PARA PAGINA DE CARRINHO DE COMPRAS

  getCart() {
    const cart = this.getProductCart();
    if (cart) {
      return cart;
    } else {
      throw new Error('Ainda sem carrinho de compras');
    }
  }

  addCurrentItemCart(item: Item) {
    const cart = this.getProductCart();

    if (cart.length > 0) {
      this.addItemCart(item.product);
    }
    {
      this.listProduct[
        (this.listProduct.findIndex((e) => e.id === item.id), 1)
      ].amount += 1;
      this.addItemCart(item.product);
    }
  }

  // DIMINUTIR NUMERO DE ITENS DO PRODUTO
  decreaseItemCart(item: Item) {
    // DIMINUTIR ITEM DO LOCALSTORAGE ==============

    const cart = this.getProductCart();

    const current_amount = cart[cart.findIndex((e) => e.id == item.id)].amount;

    if (current_amount == 0) {
      cart.splice(
        cart.findIndex((e) => e.id == item.id),
        1
      );

      this.listProduct[
        (this.listProduct.findIndex((e) => e.id === item.id), 1)
      ].amount = 0;
      this.setProductCart(cart);

      return;
    } else {
      cart[cart.findIndex((e) => e.id == item.id)].amount -= 1;
      this.setProductCart(cart);
    }

    // DIMINUIR A QUANTIDADE DE ITEM DO LIST DE PRODUTOS ================

    this.listProduct[
      (this.listProduct.findIndex((e) => e.id === item.id), 1)
    ].amount -= 1;
  }

  setProductCart(cart: Array<Item>) {
    if (cart) {
      const _cart = JSON.stringify(cart);
      if (this.cookieService.hasItem('cart')) {
        this.cookieService.removeItem('cart');
        this.cookieService.setItem('cart', _cart);
      }
    }
  }

  // SERVIR LISTA DE PRODUTOS

  // SE NÃO TIVER NA LISTA DE PRODUTOS, CHAME ESSA FUNÇÃO.
  goProductList(query: string) {
    this.router.navigate(['product_list'], { queryParams: { query } });
  }
}
