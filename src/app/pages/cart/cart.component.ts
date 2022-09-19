import { GlobalAlertService } from './../../core/global-alert.service';
import { PurchaseDetail } from './../../core/model/Purchase';
import { Router } from '@angular/router';
import { ServerService } from './../../core/server/server.service';
import { ProductService } from './../../core/global/product.service';
import { ProductList, Cotacao, Purchase } from './../../core/model/Product';
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
    public productService: ProductService,
    public server: ServerService,
    public router: Router
  ) {
  }

  ngOnInit() {}

  removeItem(item: Item) {
    this.productService.decreaseItemCart(item);
  }

  remove(item: Item){
    this.productService.deleteItemCart(item);
  }

  add(item: Item){
    this.productService.addItemCart(item.product);
  }

  async finalizePurchase(){
    try {
      this.purchaseService.finishPurchase()
      .then(purchase => {
        if(purchase) {
          const {id} = purchase;
          this.router.navigate([`purchase_summary`], {queryParams: {id}});
          this.purchaseService.clearCart();
        }
      }, error => {
        this.router.navigate(['login']);
      });
    } catch (error: any) {
      if (error.status == 401) this.router.navigate(['login']);
    }
  }

  creteCotacao() {
    const productCotacao: Cotacao[] = this.products.map((item: Item) => {
      return {
        product_name: item.product.product_name,
        weight: item.product.weight,
        category: item.product.categoria,
        provider_primary: item.product.provider_primary,
        quantity: item.product.quantity,
        total: item.product.price * item.product.quantity,
        price: item.product.price,
        id: item.product.id,
      }
    });


    try {
      this.server.createCotacao(productCotacao).then(data => {
        console.log(data)
        this.router.navigate(['profile/cotacoes']);
      })

    } catch (error) {

      console.log('DEU ERRO NO MOMENTO DE CRIAR A COTAÇÃO', error)

    }
  }


}
