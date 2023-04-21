import { changeProvider } from './../../states-handler/store/filter.store';
import { Component, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';

import {
  GlobalEventService,
  AvancedFilterComponent,
  ModalService,
  AvancedFilter,
  ListFilter,
  getFilters,
  loadProducts,
  addProductOrder,
  removeProductOrder,
  removeProductShowcase,
  addProductShowcase,
  ProductModel
} from './imports';
import { addItem, removeItem } from 'src/app/states-handler/store/cart.store';

enum Provider {
  'RMOURA' = 0,
  'CELMAR' = 1
}

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

  @Input() currentPage = 'HOME';

  onTabClick(event: any) {
    const currentProvider = Provider[event] as 'RMOURA' | 'CELMAR';
    this.store.dispatch(changeProvider({ provider: currentProvider }));
    this.store.dispatch(loadProducts());
  }

  constructor (
    public modalService: ModalService,
    public global: GlobalEventService,
    private store: Store<any>,
  ){
    this.store.dispatch(getFilters());
    this.currentFilter$.subscribe(() => this.store.dispatch(loadProducts()));
  }

  addItemCart(product: ProductModel ) {
    this.store.dispatch(addProductShowcase({ product }));
    this.store.dispatch(addProductOrder({ productId: product.id }));
    this.store.dispatch(addItem({ product }))
  }

  removeItem(product: ProductModel) {
    this.store.dispatch(removeProductShowcase({ product }));
    this.store.dispatch(removeProductOrder({ productId: product.id }));
    this.store.dispatch(removeItem({ product }));
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
