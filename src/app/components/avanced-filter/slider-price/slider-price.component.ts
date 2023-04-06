import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-slider-price',
  templateUrl: './slider-price.component.html',
  styleUrls: ['./slider-price.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderPriceComponent {
  value: number = 100;
  minValue: number = 10;
  maxValue: number = 90;
  options: Options = {
    floor: 0,
    ceil: 100,
    step: 10,
    // showTicks: true
  };
}
