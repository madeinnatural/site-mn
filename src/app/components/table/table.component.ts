import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  setCurrentLimit,
  Showcase,
  ProductModel
} from './imports';

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

  innerWidth: number = 0;
  @HostListener('window:resize', ['$event'])
  productShowcase = this.store.pipe(select('productShowcase'));
  provider$ = this.store.pipe(select('provider'));
  constructor(
    private store: Store<any>
  ) {}

  ngOnInit() {
    this.innerWidth = window.innerWidth;
  }

  onResize() {
    this.innerWidth = window.innerWidth;
  }

  removeItem(product: ProductModel) {
    this.itemRm.emit(product);
  }

  addItem(product: ProductModel) {
    this.itemAdd.emit(product);
  }

  showProductsAll() {
    this.store.dispatch(setCurrentLimit({ limit: 9000 }));
  }

}

