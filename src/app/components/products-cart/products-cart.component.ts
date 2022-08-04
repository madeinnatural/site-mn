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

  unidades: Array<{name: string, valor: string}> = [
    {name: '1 kg', valor: '1'},
    {name: '5 kg', valor: '2'},
    {name: '10 kg', valor: '3'},
    {name: '15 kg', valor: '4'},
    {name: '20 kg', valor: '5'},
    {name: 'Unidade', valor: '6'},
    {name: 'Caixa', valor: '7'},
  ]

  filter_unidade: string = this.unidades[0].valor;

  loading = false;

  constructor (
    public productService: ProductService,
  ){
    this.reload()
    this.listProduct = productService.listProduct;
  }

  selectFilterUnidade(event: any){
    this.filter_unidade = event?.target.value;
  }

  search(event: any) {

    this.loading = true;

    const termo = event.target.value

    if (this.listProduct.length == 10) {
      this.showProductsAll();
    }

    if (termo == '') {
      this.listProduct = this.productService.listProduct;
    } else {
      this.listProduct = this.listProduct.filter(e => {
        if (
          e.amount.toString().toLocaleLowerCase().indexOf(termo) > 0 ||
          e.categoria && e.categoria.toString().toLocaleLowerCase().indexOf(termo) > 0 ||
          e.price.toString().toLocaleLowerCase().indexOf(termo) > 0 ||
          e.product_type.indexOf(termo) > 0 ||
          e.weight.toString().toLocaleLowerCase().indexOf(termo) > 0 ||
          e.productName.search(termo) > 0 ) {
          return e
        } return
    });
    }

    console.log(this.listProduct)

    this.loading = false;

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
