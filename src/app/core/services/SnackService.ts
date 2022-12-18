import { ProductService } from './../global/product.service';

import { CartProduct, Item, ProductList } from './../model/interfaces/Product';
import { ServerService } from './../server/server.service';
import { Snack, SnackProduct } from './../model/interfaces/Product';
import { SnackAbstract } from 'src/app/core/model/classes/SnackAbstract';
import { Injectable } from '@angular/core';
import { GlobalEventService } from '../global/global.service';
import { CookieService } from '@ngx-toolkit/cookie';

export interface Filter {
  categoryId: number,
  price: {
    priceMin: number,
    priceMax: number
  },
  weight: {
    weightMin: number,
    weightMax: number
  }
}

export interface Categorie {
  id: number,
  name: string
}

@Injectable({ providedIn: 'root' })
export class SnackService {

  private _productInCart: SnackProduct[] = [];
  get productInCart(): SnackProduct[] {
    return this._productInCart;
  }

  set productInCart(list: SnackProduct[]) {
    this._productInCart = list;
  }

  filter: Filter = {
    categoryId: -1,
    price: {
      priceMin: 0,
      priceMax: 100
    },
    weight: {
      weightMin: 0,
      weightMax: 100,
    }
  }

  categories: Categorie[] = [];

  constructor(
    public server: ServerService,
    public productService: ProductService,
    public cookie: CookieService,
    public global: GlobalEventService
  ) {
  }

  // Funções de listagem
  protected increment(id: number) {
    // this.productInCart.forEach((product, index) => {
    //   if (product && product.id === id) {
    //     console.log(product.quantity);
    //     product.quantity += 1;
    //     product.subTotal = product.price * product.product_weight * product.quantity;
    //   }
    // });
  }

  protected decrement(id: number) {
    // if (this._productInCart.length === 0) throw new Error("Carrinho vazio service");

    // const product = this._productInCart.find((item) => item.id === id);

    // if (!product) throw new Error('Produto não encontrado');

    // if (product.quantity > 1) {
    //   product.quantity -= 1;
    //   product.subTotal -= product.price * product.product_weight * product.quantity;
    // } else {
    //   product.quantity = 0;
    //   product.subTotal = 0
    // }

  }

  // Funções de carrinho Service---------------------------
  protected add(product: SnackProduct) {
    this.productInCart.push(product);
  }

  protected remove(product: SnackProduct) {
    this.productInCart = this.productInCart.filter((item) => item !== product);
  }
  // ------------------------------------------------------




  // Funções de carrinho Local Storage: remove
  protected decrementCart(id: any): void {
    // const hasCart = this.cookie.hasItem(this.global.CART_PATH);
    // if (!hasCart) throw new Error('Carrinho não encontrado');

    // const product = this.productInCart.find((item) => item.id === id);
    // if (!product) throw new Error('Produto não encontrado');

    // product.quantity -= 1;
    // product.subTotal = this.getParcialPrice(
    //   product.price,
    //   product.quantity,
    //   product.product_weight
    // )

    // this.addCartListLocalStorage(product);
  }

  // Funções de carrinho Local Storage:add
  protected incrementCart(id: number) {
    // const hasCart = this.cookie.hasItem(this.global.CART_PATH);
    // const indexProduct = this.productInCart.findIndex((item) => item.id === id);

    // if (!indexProduct) throw new Error('Produto não encontrado');
    // if (!hasCart) return this.addCartListLocalStorage(this.productInCart[indexProduct]);

    // const product: SnackProduct = {
    //   ...this.productInCart[indexProduct],
    // }

    // product.quantity += 1;
    // product.subTotal = this.getParcialPrice( product.price, product.quantity, product.product_weight);

    // this.addCartListLocalStorage(product);
  }

  // Funções de carrinho Local Storage: Classe
  private transformerCartProduct(product: SnackProduct, price: number, parcial_price: number ): CartProduct {
    return {
      quantity: 0,
      id: product.id,
      parcial_price,
      product: {
        id: product.id,
        product_name: product.name,
        weight: product.weight,
        price: price,
        quantity: 0,
      }
    }
  }

  private addCartListLocalStorage (productInService: SnackProduct) {
    // const itemCart = this.transformerCartProduct(productInService);
    // const cart = this.cookie.getItem(this.global.CART_PATH);
    // if (cart) {
    //   const cartList: CartProduct[] = JSON.parse(cart);
    //   const productInCartMacthIndex = cartList.findIndex((item) => item.id === productInService.id);

    //   if (productInCartMacthIndex != -1) cartList[productInCartMacthIndex] = itemCart;
    //   else cartList.push(itemCart);

    //   this.cookie.setItem(this.global.CART_PATH, JSON.stringify(cartList));
    // } else {
    //   itemCart.quantity = 1;
    //   itemCart.parcial_price = itemCart.quantity * itemCart.product.price * itemCart.product.weight;
    //   itemCart.product.quantity = itemCart.quantity;
    //   itemCart.product.total = itemCart.product.price * itemCart.product.weight * itemCart.product.quantity;
    //   this.cookie.setItem(this.global.CART_PATH, JSON.stringify([itemCart]));
    // }
  }

  private getParcialPrice(price: number, quant: number, weigh: number) {
    return price * quant * weigh;
  }

  // Funções all
  async refresh() {}

  decrementSnackQuantity(id: number) {
    this.decrement(id);
    this.decrementCart(id);
  }

  incrementSnackQuantity(id: number) {
    this.increment(id);
    this.incrementCart(id);
  }

  async getCategories() {
    return await this.server.getCategoriasSnacks();
  }

  pullProductList() {

  }


  async searchProduct(termo: string) {
    const filter = this.filter;

    const cartJson = this.cookie.getItem(this.global.CART_PATH);
    const cart = cartJson ? JSON.parse(cartJson) : [];
    const vefiryQuantity = (productId: number) => {
      if (cart) {
        const product = cart.find((product: any) => product.id == productId);
        if (product) {
          return product.quantity;
        } else {
          return 0;
        }
      } else {
        return 0
      }
    }

    this.productInCart = (await this.server.getSnacks(termo, filter)).map((product:any) => {
        return {
          id: product.id,
          display_name: product.display_name,
          name: product.product_name,
          price: product.price,
          weight: product.weight,
          quantity: vefiryQuantity(product.id),
          subTotal: vefiryQuantity(product.id) * product.price * product.weight,
          secondary_category: product.secondary_category,
        }
      })
    }

}


/**
 * Coisas que precisa ser feitas no servidor:
 * 1 - Criar um ID para o carrinho ( multiplicando o id por 1000 )
 * 2 - Modelo de filtragem de produtos
 */
