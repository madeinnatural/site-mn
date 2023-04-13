import { ProductsDisplay, DataBar } from './../../core/model/interfaces/Product';
import { GlobalEventService } from './../../core/services/global.service';
import { AvancedFilterComponent } from './../avanced-filter/avanced-filter.component';
import { ModalService } from './../../core/services/modal.service';
import { Observable} from 'rxjs';
import { AvancedFilter } from '../../core/model/interfaces/Product';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { ListFilter, LoadedProductProperties, getFilters } from 'src/app/states-handler/store/filter.store';
import { loadProducts, setProducts } from 'src/app/states-handler/store/product.store';
import { ProductModel } from 'src/app/core/domain/model/product/product';
import { NgbDropdownModule, NgbNavChangeEvent, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { addProductShowcase, removeProductShowcase, uploadProductsShowcase } from 'src/app/states-handler/store/product-showcase.store';
import { loadCartSuccess } from 'src/app/states-handler/store/cart.store';
import { addProductOrder, getProductOrder, removeProductOrder } from 'src/app/states-handler/store/order.store';
import { Order } from 'src/app/core/domain/model/logistics/cart';

@Component({
  selector: 'products-cart',
  templateUrl: './products-cart.component.html',
  styleUrls: ['./products-cart.component.scss'],
})
export class ProductsCartComponent {
  filterList$      = this.store.pipe<ListFilter>(select('filtersProvider')).pipe(select('filterResponse'));
  loadProducts$    = this.store.pipe(select('getProducts'));
  currentFilter$   = this.store.pipe(select('currentFilter'));
  productShowcase$ = this.store.pipe(select('productShowcase'));

  constructor (
    public modalService: ModalService,
    public global: GlobalEventService,
    private store: Store<any>,
  ){
    this.store.dispatch(getFilters());
    this.store.dispatch(loadProducts());
    this.currentFilter$.subscribe(() => this.store.dispatch(loadProducts()));
  }

  addItemCart(product: ProductModel ) {
    this.store.dispatch(addProductShowcase({ product }));
    this.store.dispatch(addProductOrder({ productId: product.id }));
  }

  removeItem(product: ProductModel) {
    this.store.dispatch(removeProductShowcase({ product }));
    this.store.dispatch(removeProductOrder({ productId: product.id }));
  }

  initCart(product: ProductModel) {
    this.store.dispatch(addProductShowcase({ product }));
    this.store.dispatch(addProductOrder({ productId: product.id }));
  }

  filter: AvancedFilter = { price: 0, category: '' };
  openFiltro() {
    this.modalService.openModal(AvancedFilterComponent,{
      filter: this.filter,
      filterList: this.filterList$,
    }).afterClosed().subscribe( async (result) => {});
  }

}
