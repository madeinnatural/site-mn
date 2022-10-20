import { AvancedFilterComponent } from './../avanced-filter/avanced-filter.component';
import { ModalService } from './../../core/global/modal.service';
import { debounceTime, distinctUntilChanged, flatMap, map, Observable, of, Subject, delay } from 'rxjs';
import { ProductService } from './../../core/global/product.service';
import { Item, ProductList, AvancedFilter } from './../../core/model/Product';
import { ServerService } from './../../core/server/server.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-cart',
  templateUrl: './products-cart.component.html',
  styleUrls: ['./products-cart.component.scss'],
})
export class ProductsCartComponent implements OnInit {


  keyUp = new Subject<any>();
  listProduct: Array<ProductList> = [];
  noMoreProduct = this.productService.noMoreProduct;
  loading = false;

  _termo = '';
  get termo ():string {

    return this._termo
  }
  set termo (valor: string) {
    this.keyUp.next(valor)
    this._termo = valor;
  }

  filter: AvancedFilter = {
    price: 0,
    category: '',
  }

  constructor (
    public productService: ProductService,
    public serverService: ServerService,
    public modalService: ModalService,
    public server: ServerService,
  ){
    this.loading = true;
    this.pullProducts();

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

  pullProducts(page: number = 0) {
    this.productService.pullProductSever(page).then((products)=>{
      this.listProduct = products as ProductList[];
      this.loading = false;
    });
  }


  async search() {
    this.loading = true;
    if ( this.filter ) {
      this.productService.veryfy_product_in_cart(await this.serverService.search(this.termo,this.filter));
      this.listProduct = this.productService.listProduct;
      this.loading = false;
      return;
    }
    this.productService.veryfy_product_in_cart(await this.serverService.search(this.termo,undefined,0));
    this.listProduct = this.productService.listProduct;
    this.loading = false;
    return;
  }


  addItemCart(product: ProductList) {
    this.productService.addItemCart(product);
  }

  removeItem(product: ProductList) {
    const create_item = new Item(product.id,product, product.quantity, product.price);
    this.productService.decreaseItemCart(create_item);
  }

  initCart(product: ProductList) {
    this.productService.initCart(product);
  }

  showProductsAll() {
    this.pullProducts(-1);
  }

  openFiltro() {
    this.modalService.openModal(AvancedFilterComponent, {
      price: this.filter.price,
      category: this.filter.category,
     }).afterClosed().subscribe( async (result) => {
        if (result) {
          const {category, price} = result;
          this.filter.category = category;
          this.filter.price = price;
          this.search();
        }
    });
  }

  ngOnInit(){
    this.listProduct = this.productService.listProduct
  }

}
