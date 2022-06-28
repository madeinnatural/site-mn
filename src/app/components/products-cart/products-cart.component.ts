import { GlobalEventService } from './../../core/global/global.service';
import { PurchaseService } from './../../core/global/purchase.service';
import { Item, Product } from './../../core/model/Product';
import { ServerService } from './../../core/server/server.service';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-cart',
  templateUrl: './products-cart.component.html',
  styleUrls: ['./products-cart.component.scss']
})
export class ProductsCartComponent implements OnInit {

  @Input('listProduct') listProduct: Array<Product> = [];

  currentPage: number = 1;
  loadingListProducts: boolean = false;

  displayedColumns = ['productName', 'weight', 'price', 'product_type']

  constructor(
    private server: ServerService,
    private purchaseService: PurchaseService,
    private globalEventService: GlobalEventService,
  ) {}

  async showProductsAll() {
    this.currentPage += 1;
    const products = await this.server.getProductListHome(this.currentPage);
    this.listProduct.push(...products.result);
  }


  async ngOnInit() {

    this.loadingListProducts = !this.loadingListProducts
    const produts = await this.server.getProductListHome(this.currentPage);

    console.log('produts =>',produts)

    this.listProduct = produts.result.map((e, index) => {
      return {
        id: e.id,
        productName: e.productName,
        price: e.price ? e.price : 0.00,
        product_type: e.product_type ? e.product_type : 'INDEFINIDO',
        weight: e.weight ? e.weight : 0.00,
        amount: 0,
      }
    });

    this.loadingListProducts = !this.loadingListProducts
  }

  initCart(product: Product) {

    this.addItemCart(product);

  }

  addItemCart(product: Product) {

    this.listProduct[this.listProduct.findIndex(e => e.id == product.id)].amount += 1;

    const item: Item = {
      id: product.id,
      amount: 0,
      parcial_price: product.price,
      product
    };

    this.purchaseService.addItemCart(item);

    this.globalEventService.addItemCartEmit.emit('add:cart');
  }

  removeItem (product: Product) {

    this.globalEventService.addItemCartEmit.emit('removel:cart');

    this.listProduct[this.listProduct.findIndex(e => e.id == product.id)].amount -= 1;

    const item: Item = {
      id: product.id,
      amount: product.amount,
      parcial_price: product.price,
      product
    };

    this.purchaseService.removeItem(item);
  }

}
