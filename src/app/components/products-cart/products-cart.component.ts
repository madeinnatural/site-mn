import { debounceTime, distinctUntilChanged, flatMap, map, Observable, of, Subject, delay } from 'rxjs';
import { CookieService } from '@ngx-toolkit/cookie';
import { ProductService } from './../../core/global/product.service';
import { GlobalEventService } from './../../core/global/global.service';
import { PurchaseService } from './../../core/global/purchase.service';
import { Item, ProductList } from './../../core/model/Product';
import { ServerService } from './../../core/server/server.service';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-cart',
  templateUrl: './products-cart.component.html',
  styleUrls: ['./products-cart.component.scss'],
})
export class ProductsCartComponent implements OnInit {

  listProduct: Array<ProductList> = [];

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

  termo: string = '';

  constructor (
    public productService: ProductService,
    public serverService: ServerService
  ){
    this.loading = true;
    productService.pullProductSever().then((products)=>{
      console.log('PRODUCTS', products);
      this.listProduct = products as ProductList[];
      this.loading = false;
    })


    this.keyUp.pipe(
      map((event) => (event as any).target.value),
      debounceTime(1000),
      distinctUntilChanged(),
      flatMap(search => of(search).pipe(delay(500)))
    ).subscribe(async termo => {
      console.log(termo)
      this.termo = termo;
      await this.search();
    });
  }

  selectFilterUnidade(event: any){
    this.filter_unidade = event?.target.value;
  }

  public keyUp = new Subject<any>();

  async search() {

    this.loading = true;

    if (this.termo == '') {
      this.productService.veryfy_product_in_cart(await this.serverService.search('', 0));
      this.listProduct = this.productService.listProduct;
    } else {
      this.productService.veryfy_product_in_cart(await this.serverService.search(this.termo));
      this.listProduct = this.productService.listProduct;

      // this.listProduct = this.listProduct.filter(e => {
      //   if (
      //     find_text_like(e.amount.toString().toLocaleLowerCase())||
      //     e.categoria && find_text_like(e.categoria.toString().toLocaleLowerCase())||
      //     find_text_like(e.price.toString().toLocaleLowerCase())||
      //     find_text_like(e.provider_primary.toString().toLocaleLowerCase())||
      //     find_text_like(e.weight.toString().toLocaleLowerCase())||
      //     find_text_like(e.product_name) ){
      //     return e;
      //   }
      //   return;
      // });

      this.loading = false;
    }

  }


  addItemCart(product: ProductList) {
    this.productService.addItemCart(product);
  }

  removeItem(product: ProductList) {
    const create_item = new Item(product.id,product, product.amount, product.price);
    this.productService.removeItem(create_item);
  }


  initCart(product: ProductList) {
    this.productService.initCart(product);
  }

  async showProductsAll() {
    this.productService.showProductsAll();
  }

  ngOnInit(){
    this.listProduct = this.productService.listProduct
  }

}
