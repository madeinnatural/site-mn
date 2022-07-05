import { CookieService } from '@ngx-toolkit/cookie';
import { ProductService } from './../../core/global/product.service';
import { GlobalEventService } from './../../core/global/global.service';
import { PurchaseService } from './../../core/global/purchase.service';
import { Item, Product } from './../../core/model/Product';
import { ServerService } from './../../core/server/server.service';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-cart',
  templateUrl: './products-cart.component.html',
  styleUrls: ['./products-cart.component.scss'],
})
export class ProductsCartComponent implements OnInit {

  listProduct: Array<Product> = [];
  constructor (
    public productService: ProductService,
  ){
    this.reload()
    this.listProduct = productService.listProduct;
  }

  reload() {
   this.reload;
  }

  addItemCart(product: Product) {
    this.productService.addItemCart(product);
  }

  removeItem(product: Product) {
    this.productService.removeItem(product);
  }


  initCart(product: Product) {
    this.productService.initCart(product);
  }

  async showProductsAll() {
    this.productService.showProductsAll();
  }

  ngOnInit(){
    this.listProduct = this.productService.listProduct
  }

}
