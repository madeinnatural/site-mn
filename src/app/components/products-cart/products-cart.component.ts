import { AlertoInterface } from './../../core/model/Alert';
import { GlobalEventService } from './../../core/global/global.service';
import { AvancedFilterComponent } from './../avanced-filter/avanced-filter.component';
import { ModalService } from './../../core/global/modal.service';
import { debounceTime, distinctUntilChanged, flatMap, map, Observable, of, Subject, delay, tap, from } from 'rxjs';
import { ProductService } from './../../core/global/product.service';
import { Item, ProductList, AvancedFilter } from './../../core/model/Product';
import { ServerService } from './../../core/server/server.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-products-cart',
  templateUrl: './products-cart.component.html',
  styleUrls: ['./products-cart.component.scss'],
})
export class ProductsCartComponent implements OnInit {

  listProduct: Observable<ProductList[]> = new Observable();
  filter: AvancedFilter = { price: 0, category: '' };
  loadingPage = false;
  termo = '';
  page = 0;

  total = 1;
  quantidade = 1;

  @Output() data_card = new EventEmitter< {
    total: number,
    quantidade: number,
  }>()

  constructor (
    public productService: ProductService,
    public serverService: ServerService,
    public modalService: ModalService,
    public server: ServerService,
    public global: GlobalEventService,
  ){
    this.pullProducts();
  }

  keyPress(event: KeyboardEvent) {
    if (this.termo.length > 3) {
      setTimeout(() => {
        this.search();
      },500);
    }
  }

  pullProducts(page: number = 0) {
    this.global.loading.emit(true);
    this.productService.pullProductSever(page).pipe((e) => {
      this.listProduct = e;
      return e;
    }).subscribe({
      next: (products) => {
      },
      error: (error) => {
        this.global.goAlert.emit({
          text: (error as Error).message,
          type: 'warning',
          duration: 5000,
        });
        throw new Error('Algo deu errado');
      }
    })
    this.global.loading.emit(false);
  }

  search() {
    return this.serverService.search(this.termo, this.page)
    .pipe(tap((products) => { products.data = this.productService.veryfy_product_in_cart(products.data); return products; }))
    .pipe(map(element => this.listProduct = of(element.data)))
    .subscribe({
      next: (products) => {

      },
      error: (error) => {
        this.global.goAlert.emit({
          text: (error as Error).message,
          type: 'warning',
          duration: 5000,
        });
        throw new Error('Algo deu errado');
      }
    })
  }


  changeCartData () {

    const quantidade = this.productService.getQuantidade();
    const total = this.productService.getTotal();

    this.data_card.emit({quantidade,total})
  }

  addItemCart(product: ProductList) {
    this.productService.addItem(product.id);
    this.changeCartData();
  }

  removeItem(product: ProductList) {
    this.productService.decreseItem(product.id);
    this.changeCartData();
  }

  initCart(product: ProductList) {
    this.productService.initCart(product.id);
    this.changeCartData();
  }

  showProductsAll() {
    this.pullProducts(-1);
    window.scrollY
    window.scrollTo(500, 1000);
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
    this.listProduct.pipe(map((products) => { products = this.productService.veryfy_product_in_cart(products); return products; }));
  }

}
