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
  noMoreProduct: boolean = false;

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
  ) {}

  async pullProductSever() {
    return new Promise((res) => {
      const productCart = this.getProductCart();
      this.server.getProductListHome(0).subscribe((produts) => {
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
    });
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
    this.server.getProductListHome(this.currentPage == 3 ? -1 : this.currentPage)
    .subscribe((products) => {
      const productCart = this.getProductCart();

      if (products.length == 0) this.noMoreProduct = true;

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

      this.currentPage += 1;
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
        const index_current_list_product = this.listProduct.findIndex(
          (e) => e.id == item.id
        );

        const current_cart = cart;
        current_cart[index_current_product].product.amount += 1;
        current_cart[index_current_product].amount += 1;

        const count_item = cart[index_current_product].product.amount;
        const value_item = cart[index_current_product].product.price;

        current_cart[index_current_product].parcial_price =
          count_item * value_item;

        this.listProduct[index_current_list_product].amount += 1;

        this.cookieService.setItem('cart', JSON.stringify(current_cart));
      } else {
        const index_current_list_product = this.listProduct.findIndex(
          (e) => e.id == item.id
        );
        if (index_current_list_product > -1) {
          this.listProduct[index_current_list_product].amount = 1;
        }
        item.amount = 1
        cart.push(item);
        this.cookieService.setItem('cart', JSON.stringify(cart));
      }
    } else {
      item.amount = 1;
      const new_cart: Array<Item> = [item];
      this.listProduct[this.listProduct.findIndex(e => e.id == item.id)].amount = 1;
      this.cookieService.setItem('cart', JSON.stringify(new_cart));
    }

    this.globalEventService.addItemCartEmit.emit('add:cart');
  }

  removeItemLocalStoragee(item: Item) {
    let cart = this.getCartLocalStorage();
    // CASO JÁ EXISTA CARRINHO
    // VERIFICA SE EXISTE ALGUM ITEM COM O ID IDENTICO.
    if (cart && cart.findIndex((e) => e.id == item.id) > -1) {
      if (item.amount <= 0) {
        const index_current_product = cart.findIndex((e) => e.id == item.id);
        const index_current_list_product = this.listProduct.findIndex(
          (e) => e.id == item.id
        );

        const current_cart = cart;

        if (index_current_product > -1) {
          current_cart.splice(index_current_product, 1);

          this.cookieService.setItem('cart', JSON.stringify(current_cart));
        }

        if (index_current_list_product > -1) {
          this.listProduct.splice(index_current_list_product, 1);
        }
      } else {
        const index_current_product = cart.findIndex((e) => e.id == item.id);
        const index_current_list_product = this.listProduct.findIndex(
          (e) => e.id == item.id
        );
        if (index_current_product > -1) {
          const current_cart = cart;
          current_cart[index_current_product].product.amount -= 1;
          current_cart[index_current_product].amount -= 1;

          const value_item = cart[index_current_product].product.price;

          current_cart[index_current_product].parcial_price -= value_item;

          this.cookieService.setItem('cart', JSON.stringify(current_cart));
        }

        if (index_current_list_product > -1) {
          this.listProduct[index_current_list_product].amount -= 1;
        }
      }
    } else {
      const index_current_list_product = this.listProduct.findIndex(
        (e) => e.id == item.id
      );
      if (index_current_list_product > -1) {
        this.listProduct[index_current_list_product].amount -= 1;
      }
    }

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

  decreaseItemCart(item: Item) {
    if (item.amount > 1) {
      this.removeItemLocalStoragee(item);
    } else {
      this.deleteItemCart(item);
    }
  }

  deleteItemCart(item: Item) {
    let cart = this.getCartLocalStorage();

    if (cart && cart.length == 1) {
        this.cookieService.removeItem('cart');
        return;
    }

    if (cart) {
      const index_current_product = cart.findIndex((e) => e.id == item.id);
      const index_current_list_product = this.listProduct.findIndex(
        (e) => e.id == item.id
      );

      const current_cart = cart;

      if (index_current_product > -1) {
        current_cart.splice(index_current_product, 1);

        this.cookieService.setItem('cart', JSON.stringify(current_cart));
      }

      if (index_current_list_product > -1) {
        this.listProduct.splice(index_current_list_product, 1);
      }
    }

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
