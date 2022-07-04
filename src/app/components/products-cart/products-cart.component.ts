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
  @Input('listProduct') listProduct: Array<Product> = [];

  currentPage: number = 1;
  loadingListProducts: boolean = false;

  displayedColumns = ['productName', 'weight', 'price', 'product_type'];

  constructor(
    private server: ServerService,
    private purchaseService: PurchaseService,
    private globalEventService: GlobalEventService
  ) {}

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

  async ngOnInit() {
    this.loadingListProducts = !this.loadingListProducts;

    const productCart = this.purchaseService.getProductCart();

    this.server.getProductListHome( productCart && productCart.length > 9 ? -1 : 0).subscribe((produts) => {

      function current_amount(id: number) {
        let amount = 0;

        console.log(productCart);

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

      this.loadingListProducts = !this.loadingListProducts;
    });
  }

  initCart(product: Product) {
    this.addItemCart(product);
  }

  addItemCart(product: Product) {
    this.listProduct[
      this.listProduct.findIndex((e) => e.id == product.id)
    ].amount += 1;

    const item: Item = {
      id: product.id,
      amount:
        this.listProduct[this.listProduct.findIndex((e) => e.id == product.id)]
          .amount,
      parcial_price: product.price,
      product:
        this.listProduct[this.listProduct.findIndex((e) => e.id == product.id)],
    };

    this.purchaseService.addItemCart(item);

    this.globalEventService.addItemCartEmit.emit('add:cart');
  }

  removeItem(product: Product) {
    this.globalEventService.addItemCartEmit.emit('removel:cart');

    this.listProduct[
      this.listProduct.findIndex((e) => e.id == product.id)
    ].amount -= 1;

    const item: Item = {
      id: product.id,
      amount:
        this.listProduct[this.listProduct.findIndex((e) => e.id == product.id)]
          .amount,
      parcial_price: product.price,
      product,
    };

    this.purchaseService.removeItem(item);
  }
}
