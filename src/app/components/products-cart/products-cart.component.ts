import { Product } from './../../core/model/Product';
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

  constructor(
    private server: ServerService,
  ) {}

  async showProductsAll() {
    this.currentPage += 1;
    const products = await this.server.getProductListHome(this.currentPage);
    this.listProduct.push(...products.result);
  }


  async ngOnInit() {

    const produts = await this.server.getProductListHome(this.currentPage);

    console.log(produts)

    this.listProduct = produts.result;
  }

}
