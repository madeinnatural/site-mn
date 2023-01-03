import { Observable } from 'rxjs';
import { ProductList, ProductsDisplay } from './../../core/model/interfaces/Product';
import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'mn-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {

  @Input() productList?: Observable< ProductsDisplay[] >;

  @Output() itemRm = new EventEmitter<any>();
  @Output() itemAdd = new EventEmitter<any>();
  @Output() showAll = new EventEmitter<boolean>();


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
    let price = 0;
    if (productD.typeCharge == 'box') {
      const currentPrice = productD.product.price_category.packing;
      if (typeof currentPrice == 'number') {
        price = currentPrice;
      } else {
        price = 0;
      }
    } else if (productD.typeCharge == 'unit') {
      const currentPrice = productD.product.price_category.weight_unit;
      if (typeof currentPrice == 'number') {
        price = currentPrice;
      } else {
        price = 0;
      }
    } else {
      price = 0;
    }
    return price;
  }

  productValid(product: ProductsDisplay) {
    return typeof product.product.price_category.packing == 'number' || typeof product.product.price_category.weight_unit == 'number' ? true : false;
  }

}
