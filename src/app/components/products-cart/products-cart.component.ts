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

@Component({
  selector: 'products-cart',
  templateUrl: './products-cart.component.html',
  styleUrls: ['./products-cart.component.scss'],
})
export class ProductsCartComponent {

  @Input() productList?: Observable<ProductsDisplay[]>;

  filter: AvancedFilter = { price: 0, category: '' };
  loadingPage = false;
  page = 0;

  total = 0;
  quantidade = 0;

  @Input() loading: boolean = false;
  filterList$ = this.store.pipe<ListFilter>(select('filtersProvider')).pipe(select('filterResponse'));

  constructor (
    public modalService: ModalService,
    public global: GlobalEventService,
    private store: Store<any>,
  ){
    this.store.dispatch(getFilters());
  }

  pullProducts(page: number = 0) {}

  goSearch(termo: string) {}

  addItemCart(product: ProductsDisplay) {
  }

  removeItem(product: ProductsDisplay) {

  }

  initCart(product: ProductsDisplay) {
  }

  showProductsAll() {
    this.pullProducts(-1);
    window.scrollY
    window.scrollTo(500, 1000);
  }

  openFiltro() {
    this.modalService.openModal(AvancedFilterComponent,{
      filter: this.filter,
      filterList: this.filterList$,
    }).afterClosed().subscribe( async (result) => {});
  }

}
