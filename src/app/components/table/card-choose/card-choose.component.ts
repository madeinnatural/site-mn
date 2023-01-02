import { ProductsDisplay } from './../../../core/model/interfaces/Product';
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'card-choose',
  templateUrl: './card-choose.component.html',
  styleUrls: ['./card-choose.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardChooseComponent {

  @Input() product?: ProductsDisplay;
  @Input() active: boolean = false;

  @Output() itemAdd = new EventEmitter<ProductsDisplay>();

  changeTypeCharge(product: ProductsDisplay,type: string) {
    product.typeCharge = type;
    this.itemAdd.emit(product);
  }

}
