import { Observable } from 'rxjs';
import { ProductList } from './../../core/model/interfaces/Product';
import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'mn-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {

  @Input() productList?: Observable< ProductList[] >;

  @Output() itemRm = new EventEmitter<{id: number}>();
  @Output() itemAdd = new EventEmitter<{id: number}>();
  @Output() showAll = new EventEmitter<boolean>();

  removeItem(id: number) {
    this.itemRm.emit({id});
  }

  addItem(id: number) {
    this.itemAdd.emit({id});
  }

  showProductsAll() {
    this.showAll.emit(true);
  }

}
