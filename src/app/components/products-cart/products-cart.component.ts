import { CartService } from './../../core/services/cart.service';
import { ProductsDisplay, DataBar } from './../../core/model/interfaces/Product';
import { GlobalEventService } from './../../core/services/global.service';
import { AvancedFilterComponent } from './../avanced-filter/avanced-filter.component';
import { ModalService } from './../../core/services/modal.service';
import { Observable} from 'rxjs';
import { AvancedFilter } from '../../core/model/interfaces/Product';
import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'products-cart',
  templateUrl: './products-cart.component.html',
  styleUrls: ['./products-cart.component.scss'],
})
export class ProductsCartComponent {

  @Input() productList?: Observable<ProductsDisplay[]>;

  @Output() data_card = new EventEmitter<DataBar>();
  @Output() dataSearch = new EventEmitter<AvancedFilter>();

  filter: AvancedFilter = { price: 0, category: '' };
  loadingPage = false;
  page = 0;

  total = 0;
  quantidade = 0;

  constructor (
    public modalService: ModalService,
    public global: GlobalEventService,
    private cartService: CartService,
  ){}

  keyPress(event: KeyboardEvent) {
    if ( this.filter.termo && this.filter.termo.length > 3) {
      setTimeout(() => {
        this.search();
      },500);
    }
  }

  pullProducts(page: number = 0) {
    // this.global.loading.emit(true);
    // this.productService.pullProductSever(page).pipe((e) => {
    //   this.productList = e;
    //   return e;
    // }).subscribe({
    //   next: (products) => {
    //   },
    //   error: (error) => {
    //     this.global.goAlert.emit({
    //       text: (error as Error).message,
    //       type: 'warning',
    //       duration: 5000,
    //     });
    //     throw new Error('Algo deu errado');
    //   }
    // })
    // this.global.loading.emit(false);
  }

  search() {
    this.dataSearch.emit(this.filter);
  }

  addItemCart(product: ProductsDisplay) {
    product.quantityInCart += 1;

    if (product.typeCharge == 'unit') {
      // Quantidade do produto * preço da unidade * peso do produto
      const subTotal = product.quantityInCart * product.product.price_category.weight_unit;
      product.subTotal = subTotal;
    } else if (product.typeCharge == 'box') {
      // Quantidade do produto * preço do produto do pacote * peso do produto
      const subTotal = product.quantityInCart * product.product.price_category.packing;
      product.subTotal = subTotal;
    }

    this.cartService.addProductInCart(product);
  }

  removeItem(product: ProductsDisplay) {
    // this.productService.decreseItem(id);
  }

  initCart(product: ProductsDisplay) {
    // this.productService.initCart(id);
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

}
