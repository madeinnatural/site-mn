import { Item, Product } from './../model/Product';
import { Injectable, Input, OnInit } from '@angular/core';
import { ServerService } from '../server/server.service';
import { PurchaseService } from './purchase.service';
import { GlobalEventService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  currentPage: number = 1;
  listProduct: Array<Product> = [];

  constructor(
    private server: ServerService,
    private purchaseService: PurchaseService,
    private globalEventService: GlobalEventService,
  ) {
    this.initialize();
  }

  // PARA PAGINA DE PRODUCTS
  initialize() {

    const productCart = this.purchaseService.getProductCart();

    this.server.getProductListHome( productCart && productCart.length > 9 ? -1 : 0).subscribe((produts) => {

      function current_amount(id: number) {
        let amount = 0;

        productCart?.forEach((productCart) => {
          if (id == productCart.id) {
            amount = productCart.amount;
          }
        });

        return amount;
      }

      produts.result.forEach((e) => {
        this.listProduct.push({
          id: e.id,
          productName: e.productName,
          price: e.price ? e.price : 0.0,
          product_type: e.product_type ? e.product_type : 'INDEFINIDO',
          weight: e.weight ? e.weight : 0.0,
          amount: current_amount(e.id),
        });
      });
    });
  }

  async showProductsAll() {
    this.server.getProductListHome(-1).subscribe((products) => {
      const productCart = this.purchaseService.getProductCart();

      function current_amount(id: number) {
        let amount = 0;

        productCart?.forEach((productCart) => {
          if (id == productCart.id) {
            amount = productCart.amount;
          }
        });

        return amount;
      }

      products.result.map((e) => {
        this.listProduct.push({
          id: e.id,
          productName: e.productName,
          price: e.price ? e.price : 0.0,
          product_type: e.product_type ? e.product_type : 'INDEFINIDO',
          weight: e.weight ? e.weight : 0.0,
          amount: current_amount(e.id),
        });
      });
    });
  }

  initCart(product: Product) {
    this.addItemCart(product);
  }

  addItemCart(product: Product) {

    const index_curent_list = this.listProduct.findIndex((e) => e.id == product.id);

    this.listProduct[index_curent_list].amount += 1;

    const item: Item = {
      id: product.id,
      amount: this.listProduct[index_curent_list].amount,
      parcial_price: product.price,
      product: this.listProduct[index_curent_list],
    };

    this.purchaseService.addItemCart(item);

    this.globalEventService.addItemCartEmit.emit('add:cart');
  }

  removeItem(product: Product) {

    const index_current_list = this.listProduct.findIndex((e) => e.id == product.id)

    this.listProduct[index_current_list].amount -= 1;

    const item: Item = {
      id: product.id,
      amount:this.listProduct[index_current_list].amount,
      parcial_price: product.price,
      product,
    };

    this.purchaseService.removeItem(item);

    this.globalEventService.addItemCartEmit.emit('removel:cart');
  }


  // PARA PAGINA DE CARRINHO DE COMPRAS

  addCurrentItemCart(item: Item) {
    const cart = this.purchaseService.getProductCart();

    if (cart) {

      cart[cart.findIndex(e => e.id == item.id)].amount += 1;
      this.purchaseService.setProductCart(cart);

      // SOMAR A QUANTIDADE DE ITEM DO LIST DE PRODUTOS ================

      this.listProduct[this.listProduct.findIndex(e => e.id === item.id), 1].amount += 1;
    } {
      throw new Error('Tentou remover item do carrinho sem ter carrinho')
    }
  }

  // DIMINUTIR NUMERO DE ITENS DO PRODUTO
  decreaseItemCart(item: Item) {

    // DIMINUTIR ITEM DO LOCALSTORAGE ==============

    const cart = this.purchaseService.getProductCart();

    if (cart) {

      const current_amount = cart[cart.findIndex(e => e.id == item.id)].amount

      if (current_amount == 0) {

        cart.splice(cart.findIndex(e => e.id == item.id), 1)
        this.purchaseService.setProductCart(cart);

        this.listProduct[this.listProduct.findIndex(e => e.id === item.id), 1].amount = 0;

        return;

      } else {

        cart[cart.findIndex(e => e.id == item.id)].amount -= 1;
        this.purchaseService.setProductCart(cart);

      }

      // DIMINUIR A QUANTIDADE DE ITEM DO LIST DE PRODUTOS ================

      this.listProduct[this.listProduct.findIndex(e => e.id === item.id), 1].amount -= 1;
    } {
      throw new Error('Tentou remover item do carrinho sem ter carrinho')
    }

  }



}
