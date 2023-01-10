import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mn-icon',
  templateUrl: './mn-icon.component.html',
  styleUrls: ['./mn-icon.component.scss']
})
export class MnIconComponent {
  @Input() name = '';
  @Input() loading = false;
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxs' | 'default' = 'default';
}
