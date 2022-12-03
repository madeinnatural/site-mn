
import { CartProduct, Item, ProductList } from './../model/interfaces/Product';
import { ServerService } from './../server/server.service';
import { Snack, SnackProduct } from './../model/interfaces/Product';
import { SnackAbstract } from 'src/app/core/model/classes/SnackAbstract';
import { Injectable } from '@angular/core';
import { GlobalEventService } from '../global/global.service';
import { CookieService } from '@ngx-toolkit/cookie';

@Injectable({ providedIn: 'root' })
export class SnackService {

  private _productInCart: SnackProduct[] = [];
  get productInCart(): SnackProduct[] {
    return this._productInCart;
  }

  set productInCart(list: Snack[]) {
    const products: SnackProduct[] = list.map((item) => {
      const product = item as SnackProduct;
      product.id = list.length;
      product.subTotal = item.price * item.quantity * item.product_weight;
      return product;
    });
    this._productInCart = products;
  }

  constructor(
    public server: ServerService,
    public cookie: CookieService,
    public global: GlobalEventService
  ) {}

  // Funções de listagem
  protected increment(id: number) {
    this.productInCart.forEach((product, index) => {
      if (product && product.id === id) {
        product.quantity += 1;
        product.subTotal = product.price * product.product_weight * product.quantity;
      }
    });
  }

  protected decrement(id: number) {
    if (this._productInCart.length === 0) throw new Error("Carrinho vazio service");
    this._productInCart.forEach((product, index ) => {
      if (product && product.id === id) {
        if (product.quantity > 1) {
          const priceOld = product.price * product.product_weight * product.quantity;
          product.subTotal = product.price - priceOld
          product.quantity -= 1;
        } else {
          this._productInCart.splice(index, 1);
        }
      }
    })
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
    const hasCart = this.cookie.hasItem(this.global.CART_PATH);
    if (!hasCart) throw new Error('Carrinho não encontrado');

    const product = this.productInCart.find((item) => item.id === id);
    if (!product) throw new Error('Produto não encontrado');

    product.quantity -= 1;
    product.subTotal = this.getParcialPrice(
      product.price,
      product.quantity,
      product.product_weight
    )

    this.addCartListLocalStorage(product);
  }

  // Funções de carrinho Local Storage:add
  protected incrementCart(id: number) {
    const hasCart = this.cookie.hasItem(this.global.CART_PATH);
    const product = this.productInCart.find((item) => item.id === id);

    if (!product) throw new Error('Produto não encontrado');
    if (!hasCart) return this.addCartListLocalStorage(product);

    const productInService = this.productInCart.find((item) => item.id === id);
    if (!productInService) throw new Error('Produto não encontrado');

    productInService.quantity += 1;
    productInService.subTotal = productInService.price * productInService.product_weight * productInService.quantity;

    this.addCartListLocalStorage(productInService);
  }

  // Funções de carrinho Local Storage: Classe
  private transformerCartProduct(product: SnackProduct ): CartProduct {
    return {
      quantity: product.quantity,
      id: product.id,
      parcial_price: product.price,
      product: {
        id: product.id,
        product_name: product.name,
        weight: product.product_weight,
        price: product.price * product.product_weight,
        quantity: product.quantity,
      }
    }
  }

  private addCartListLocalStorage (productInService: SnackProduct) {
    const itemCart = this.transformerCartProduct(productInService);
    const cart = this.cookie.getItem(this.global.CART_PATH);
    if (cart) {
      const cartList: CartProduct[] = JSON.parse(cart);
      const productInCartMacthIndex = cartList.findIndex((item) => item.id === productInService.id);

      if (productInCartMacthIndex != -1) cartList[productInCartMacthIndex] = itemCart;
      else cartList.push(itemCart);

      this.cookie.setItem(this.global.CART_PATH, JSON.stringify(cartList));
    } else {
      this.cookie.setItem(this.global.CART_PATH, JSON.stringify([itemCart]));
    }
  }

  private getParcialPrice(price: number, quant: number, weigh: number) {
    return price * quant * weigh;
  }

  // Funções all
  refresh() {

    // LEMPRAR QUE DO SERVIDOR PRECISA VIR UM ID COM DOIS ALGOTITMOS PARA NÃO CONFLITAR COM OS IDS DO CARRINHO
    this._productInCart = [
      {
        id: 1,
        display_name: 'Coca-Cola',
        name: 'coca-cola',
        price: 5.0,
        product_weight: 2,
        quantity: 0,
        secondary_category: 'Bebidas',
        subTotal: 0,
      },
      {
        id: 2,
        display_name: 'Coca-Cola',
        name: 'coca-cola',
        price: 5.0,
        product_weight: 2,
        quantity: 0,
        secondary_category: 'Bebidas',
        subTotal: 0,
      },
      {
        id: 3,
        display_name: 'Coca-Cola',
        name: 'coca-cola',
        price: 5.0,
        product_weight: 2,
        quantity: 0,
        secondary_category: 'Bebidas',
        subTotal: 0,
      },
      {
        id: 4,
        display_name: 'Coca-Cola',
        name: 'coca-cola',
        price: 5.0,
        product_weight: 2,
        quantity: 0,
        secondary_category: 'Bebidas',
        subTotal: 0,
      },
      {
        id: 5,
        display_name: 'Coca-Cola',
        name: 'coca-cola',
        price: 5.0,
        product_weight: 2,
        quantity: 0,
        secondary_category: 'Bebidas',
        subTotal: 0,
      },
      {
        id: 6,
        display_name: 'Coca-Cola',
        name: 'coca-cola',
        price: 5.0,
        product_weight: 2,
        quantity: 0,
        secondary_category: 'Bebidas',
        subTotal: 0,
      },
    ];

    console.log(this.productInCart);
    // this.productInCart = await this.server.getSnacks();
  }

  decrementSnackQuantity(id: number) {
    this.decrement(id);
    this.decrementCart(id);
  }

  incrementSnackQuantity(id: number) {
    this.increment(id);
    this.incrementCart(id);
  }

}
