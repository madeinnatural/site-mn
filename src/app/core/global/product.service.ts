import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CookieService } from '@ngx-toolkit/cookie';
import { Router } from '@angular/router';
import { Item, ProductList } from './../model/Product';
import { Injectable, Input, OnInit } from '@angular/core';
import { ServerService } from '../server/server.service';
import { PurchaseService } from './purchase.service';
import { GlobalEventService } from './global.service';
import { map } from 'rxjs';

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
    public server: ServerService,
    public purchaseService: PurchaseService,
    private globalEventService: GlobalEventService,
    private router: Router,
    private cookieService: CookieService,
    public http: HttpClient
  ) {}

  total = 0;

  totalPrice() {
    const cart_jason = this.cookieService.getItem('cart');

    if (cart_jason) {
      const cart = this.getCartLocalStorage();

      if (!cart) return 0

      let total = 0;
      for (let i = 0; i < cart.filter((e) => e.parcial_price > 0).length; i++) {
        total += cart[i].parcial_price;
      }

      return total;
    }

    return 0;
  }

  cartLength () {
    const cart_j = this.cookieService.getItem('cart')
    if (cart_j) {
      return JSON.parse(cart_j).length
    }
    return 0
  }

  getQuantidade(){
    return this.cartLength();
  }

  getTotal(){
    return this.totalPrice();
  }

  calculeQuantidade(id: number, productCart: ProductList[]): number {
    return productCart
    .filter((product) => product.id == id)
    .map((product) => product.quantity)
    .reduce((previousValue, currentValue) => previousValue + currentValue,0)
  }

  pullProductSever(page: number = 0) {
    const listItem = this.getProductCart();
    const productsCart = listItem.map((item) => item['product']);
    return this.http.get<ProductList[]>(environment.baseUrl, {params: {page}})
    .pipe(map((products) => {
      return products.map((product) => {
          product['price'] = product['price'] ? product['price'] : 0.0;
          product['provider_primary'] = product['provider_primary'] != '' ? product['provider_primary'] : 'INDEFINIDO';
          product['quantity'] = this.calculeQuantidade(product.id, productsCart);
          return product;
        }).filter((product) => product['product_name'] != 'produto');
      }
    )).pipe(map((products) => { this.listProduct = products; return products; }));
  }

  private getCartLocalStorage(): Array<Item> | null {
    const data = this.cookieService.getItem('cart');
    if (data) return JSON.parse(data);
    return null;
  }

  veryfy_product_in_cart(products: ProductList[]) {
    const productCart = this.getProductCart();

    function current_amount(id: number) {
      let quantity = 0;

      productCart?.forEach((productCart) => {
        if (id == productCart.id) quantity = productCart.quantity;
      });

      return quantity;
    }

    console.log(products);

    this.listProduct = products.map((e) => {
      return {
        id: e.id,
        product_name: e.product_name,
        price: e.price ? e.price : 0.0,
        provider_primary: e.provider_primary != '' ? e.provider_primary : 'INDEFINIDO',
        weight: e.weight ? e.weight : 0.0,
        quantity: current_amount(e.id),
      };
    });

    return this.listProduct;
  }

  showProductsAll() {
    this.server.getProductListHome(this.currentPage == 3 ? -1 : this.currentPage)
    .subscribe((products) => {
      const productCart = this.getProductCart();

      if (products.length == 0) this.noMoreProduct = true;

      function current_amount(id: number) {
        let quantity = 0;

        productCart?.forEach((productCart) => {
          if (id == productCart.id) {
            quantity = productCart.quantity;
          }
        });

        return quantity;
      }

      products.map((e) => {
        this.listProduct.push({
          id: e.id,
          product_name: e.product_name,
          price: e.price ? e.price : 0.0,
          provider_primary:
            e.provider_primary != '' ? e.provider_primary : 'INDEFINIDO',
          weight: e.weight ? e.weight : 0.0,
          quantity: current_amount(e.id),
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
      quantity: product.quantity,
      parcial_price: product.price,
      product: product,
    };

    this.addItemLocalStorage(item);
  }

  addItemLocalStorage(item: Item) {

    this.adicionar_item_no_product_list(item.id);
    this.adicionar_item_no_carrinho(item.id);

    this.globalEventService.addItemCartEmit.emit('add:cart');
  }

  private adicionar_item_no_product_list(productId: number) {

    const product = this.listProduct.find((product) => product.id == productId);

    if (product) {

      const index_current_list_product = this.listProduct.findIndex((e) => e.id == product.id);
      const exist_item_no_product_list = index_current_list_product != -1;

      if ( exist_item_no_product_list ) {
        this.listProduct[index_current_list_product].quantity += 1;
        this.listProduct[index_current_list_product].total = this.listProduct[index_current_list_product].price * this.listProduct[index_current_list_product].quantity;
      } else {
        product.quantity = 1;
        product.total = product.price * product.quantity;
        this.listProduct.push(product);
      }

    } else {
      throw new Error('Produto não encontrado: Adicionar a lista de produto =>' + productId);
    }

  }

  private adicionar_item_no_carrinho (productId: number) {
    let cart = this.getCartLocalStorage();
    if (cart) {
      const item = cart.find((product_cart) => product_cart.id == productId);

      if (item) {
        const index_do_item_no_carrinho = cart.findIndex((e) => e.id == item.id);
        const existe_item_no_carrinho = index_do_item_no_carrinho != -1;

        if (existe_item_no_carrinho) {
          cart[index_do_item_no_carrinho].quantity += 1;
          cart[index_do_item_no_carrinho].parcial_price = cart[index_do_item_no_carrinho].product.price * cart[index_do_item_no_carrinho].quantity;
          cart[index_do_item_no_carrinho].product.total = cart[index_do_item_no_carrinho].product.price * cart[index_do_item_no_carrinho].quantity;
          cart[index_do_item_no_carrinho].product.quantity = cart[index_do_item_no_carrinho].quantity;
        } else {
          item.quantity = 1;
          item.parcial_price = item.product.price * item.quantity;
          item.product.total = item.product.price * item.quantity;
          item.product.quantity = item.quantity;
          cart.push(item);
        }
        this.cookieService.setItem(this.globalEventService.CART_PATH, JSON.stringify(cart));

      } else {

        const product = this.listProduct.find((product) => product.id == productId);

        if (product) {
          const item: Item = {
            id: product.id,
            quantity: product.quantity,
            parcial_price: product.price,
            product: product,
          }

          cart.push(item);

          this.adicionarCartLocalStorage(cart);

        } else {
          throw new Error('Produto não encontrado: (1) Adicionar ao carrinho => ' + productId);
        }
      }

    } else {

      const product = this.listProduct.find((product) => product.id == productId);
      if (product) {
        const item: Item = {
          id: product.id,
          quantity: product.quantity,
          parcial_price: product.price,
          product: product,
        }
        this.adicionarCartLocalStorage([item]);
      } else {
        throw new Error('Produto não encontrado: (2) Adicionar ao carrinho => ' + productId);
      }
    }
  }

  protected adicionarCartLocalStorage(item: Item[]) {
    this.cookieService.setItem(this.globalEventService.CART_PATH, JSON.stringify(item));
  }

  removeItemLocalStoragee(item: Item) {
    let cart = this.getCartLocalStorage();
    // CASO JÁ EXISTA CARRINHO
    // VERIFICA SE EXISTE ALGUM ITEM COM O ID IDENTICO.
    if (cart && cart.findIndex((e) => e.id == item.id) > -1) {
      if (item.quantity <= 0) {
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
          // this.listProduct.splice(index_current_list_product, 1);
        }
      } else {
        const index_current_product = cart.findIndex((e) => e.id == item.id);
        const index_current_list_product = this.listProduct.findIndex(
          (e) => e.id == item.id
        );
        if (index_current_product > -1) {
          const current_cart = cart;
          current_cart[index_current_product].product.quantity -= 1;
          current_cart[index_current_product].quantity -= 1;

          const value_item = cart[index_current_product].product.price;

          current_cart[index_current_product].parcial_price -= value_item;

          this.cookieService.setItem('cart', JSON.stringify(current_cart));
        }

        if (index_current_list_product > -1) {
          this.listProduct[index_current_list_product].quantity -= 1;
        }
      }
    } else {
      const index_current_list_product = this.listProduct.findIndex(
        (e) => e.id == item.id
      );
      if (index_current_list_product > -1) {
        this.listProduct[index_current_list_product].quantity -= 1;
      }
    }

    this.globalEventService.addItemCartEmit.emit('removel:cart');
  }

  getCart() {
    const cart = this.getProductCart();
    if (cart) {
      return cart;
    } else {
      throw new Error('Ainda sem carrinho de compras');
    }
  }

  decreaseItemCart(item: Item) {
    if (item.quantity >= 1) {
      if (item.quantity == 1) {
        item.quantity = 0;
        this.removeItemLocalStoragee(item);
        return;
      }
      this.removeItemLocalStoragee(item);
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

  goProductList(query: string) {
    this.router.navigate(['product_list'], { queryParams: { query } });
  }
}
