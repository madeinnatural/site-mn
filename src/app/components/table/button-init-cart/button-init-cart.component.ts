import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'button-init-cart',
  templateUrl: './button-init-cart.component.html',
  styleUrls: ['./button-init-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonInitCartComponent {
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxs' | 'default' = 'xs';
}
