import { PurchaseService } from './../../core/global/purchase.service';
import { Item, Product } from './../../core/model/Product';
import { ServerService } from './../../core/server/server.service';
import { Component, Input, OnInit } from '@angular/core';

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
    private purchaseService: PurchaseService
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
        weight: e.weight ? e.weight : 0.00
      }
    });

    this.loadingListProducts = !this.loadingListProducts
  }

  initCart(product: Product) {
    const item: Item = {
      id: product.id,
      amount: 1,
      parcial_price: product.price,
      product
    };
    this.purchaseService.addItemCart(item);
  }

}
