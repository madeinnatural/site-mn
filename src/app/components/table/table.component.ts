import { Observable } from 'rxjs';
import { ProductsDisplay } from './../../core/model/interfaces/Product';
import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input, HostListener } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Category, setCurrentLimit } from 'src/app/states-handler/store/filter.store';
import { Showcase } from 'src/app/states-handler/store/product-showcase.store';
import { ProductModel } from 'src/app/core/domain/model/product/product';

@Component({
  selector: 'mn-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit {

  @Input() showcases?: Observable<Showcase[]>;
  @Input() currentPage = 'HOME';

  @Output() itemRm = new EventEmitter<ProductModel>();
  @Output() itemAdd = new EventEmitter<ProductModel>();
  @Output() showAll = new EventEmitter<boolean>();


  ngOnInit() {
    this.innerWidth = window.innerWidth;
  }

  innerWidth: number = 0;
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }

  formatCategory(category: Category[]) {
    return category.map((cat: Category) => cat.name).join(' | ')
  }

  removeItem(product: ProductModel) {
    this.itemRm.emit(product);
  }

  addItem(product: ProductModel) {
    this.itemAdd.emit(product);
  }

  productShowcase = this.store.pipe(select('productShowcase'));
  provider$ = this.store.pipe(select('provider'));
  constructor(
    private store: Store<any>
  ) {
  }

  showProductsAll() {
    this.store.dispatch(setCurrentLimit({ limit: 9000 }));
  }

}

