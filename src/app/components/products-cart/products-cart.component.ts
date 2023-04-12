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
import { loadProducts } from 'src/app/states-handler/store/product.store';
import { ProductModel } from 'src/app/core/domain/model/product/product';
import { NgbDropdownModule, NgbNavChangeEvent, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { uploadProductsShowcase } from 'src/app/states-handler/store/product-showcase.store';
import { loadCartSuccess } from 'src/app/states-handler/store/cart.store';

@Component({
  selector: 'products-cart',
  templateUrl: './products-cart.component.html',
  styleUrls: ['./products-cart.component.scss'],
})
export class ProductsCartComponent {

  active: any;
	disabled = true;

	onNavChange(changeEvent: NgbNavChangeEvent) {
		if (changeEvent.nextId === 3) {
			changeEvent.preventDefault();
		}
	}

	toggleDisabled() {
		this.disabled = !this.disabled;
		if (this.disabled) {
			this.active = 1;
		}
	}

  @Input() productList?: Observable<ProductsDisplay[]>;

  filter: AvancedFilter = { price: 0, category: '' };
  loadingPage = false;
  page = 0;

  total = 0;
  quantidade = 0;

  @Input() loading: boolean = false;
  filterList$ = this.store.pipe<ListFilter>(select('filtersProvider')).pipe(select('filterResponse'));
  loadProducts$ = this.store.pipe(select('getProducts'));
  currentFilter$ = this.store.pipe(select('currentFilter'));
  productShowcase$ = this.store.pipe(select('productShowcase'));

  constructor (
    public modalService: ModalService,
    public global: GlobalEventService,
    private store: Store<any>,
  ){
    this.store.dispatch(getFilters());
    this.store.dispatch(loadProducts());
    this.currentFilter$.subscribe(() => this.store.dispatch(loadProducts()));
    this.loadProducts$.subscribe((products) => {
      this.store.dispatch(uploadProductsShowcase({ products }))
    });
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
