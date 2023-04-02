import { Observable } from 'rxjs';
import { ProductList, ProductsDisplay } from './../../core/model/interfaces/Product';
import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input, HostListener } from '@angular/core';

@Component({
  selector: 'mn-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit {

  @Input() productList?: Observable< ProductsDisplay[] >;

  @Output() itemRm = new EventEmitter<any>();
  @Output() itemAdd = new EventEmitter<any>();
  @Output() showAll = new EventEmitter<boolean>();

  ngOnInit() {
    this.innerWidth = window.innerWidth;
  }

  changeTypeCharge(product: ProductsDisplay) {
    this.addItem(product);
  }

  removeItem(data: ProductsDisplay) {
    this.itemRm.emit(data);
  }

  addItem(data: ProductsDisplay) {
    this.itemAdd.emit(data);
  }

  showProductsAll() {
    this.showAll.emit(true);
  }

  changePrice(productD: ProductsDisplay) {

  }

  productValid(product: ProductsDisplay) {

  }

  innerWidth: number = 0;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }

}
