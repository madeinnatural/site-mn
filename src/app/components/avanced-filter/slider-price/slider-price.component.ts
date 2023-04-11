import { Options } from '@angular-slider/ngx-slider';
import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input, HostListener } from '@angular/core';
import { Price } from 'src/app/states-handler/store/filter.store';

@Component({
  selector: 'app-slider-price',
  templateUrl: './slider-price.component.html',
  styleUrls: ['./slider-price.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderPriceComponent {
  value = 1000;

  get minValue (): number {
    return this.currentPrice.min;
  }

  set minValue (value: number) {
    this.currentPrice.min = value;
    this.price.emit({ min: value, max: this.maxValue });
  }

  get maxValue (): number {
    return this.currentPrice.max;
  }

  set maxValue (value: number) {
    this.currentPrice.max = value;
    this.price.emit({ min: this.minValue, max: value });
  }

  constructor() {}

  options: Options = {
    ceil: 1000,
    animate: true
  };

  @Input() currentPrice: Price = {
    min: 0,
    max: 1000
  }

  title = 'Preço (R$) /Unidade'

  @Output() price = new EventEmitter<{ min: number, max: number }>();
}
