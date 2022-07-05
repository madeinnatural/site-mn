import { ProductService } from './../../core/global/product.service';
import { Product } from './../../core/model/Product';
import { PurchaseService } from './../../core/global/purchase.service';
import { Component, OnInit } from '@angular/core';
import { Item } from '../../../app/core/model/Product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  _total = 0

  set total (e: number) {
    this._total = e
  }
  get total () {
    return this.purchaseService.totalPrice();
  }

  preco_entrega: number = 0;

  get total_bruto() {
    return this.preco_entrega + this.total;
  };

  _products: Array<Item> = [];

  get products () {
    const cart_products = this.purchaseService.getProductCart();
    if (cart_products) return cart_products
    return this._products;
  }

  set products (e: any) {
    this._products = e
  }

  constructor(
    public purchaseService: PurchaseService,
    public productService: ProductService
  ) {
  }

  ngOnInit() {}

  removeItem(item: Item) {
    this.purchaseService.deleItem(item);
  }

  remove(item: Item){
    this.productService.decreaseItemCart(item);
  }

  add(item: Item){
    this.productService.addCurrentItemCart(item);
  }

}
