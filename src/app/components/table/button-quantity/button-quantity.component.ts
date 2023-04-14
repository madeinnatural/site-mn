import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ProductModel, Showcase } from '../../products-cart/imports';

@Component({
  selector: 'button-quantity',
  templateUrl: './button-quantity.component.html',
  styleUrls: ['./button-quantity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonQuantityComponent {

  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxs' | 'default' = 'xs';
  @Input() quantity?: number;
  @Input() item?: ProductModel;
  @Output() itemRm = new EventEmitter<any>();
  @Output() itemAdd = new EventEmitter<any>();

  removeItem(data: any) {
    this.itemRm.emit(data);
  }

  addItem(data: any) {
    this.itemAdd.emit(data);
  }
}
