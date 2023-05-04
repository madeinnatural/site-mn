import { Component, Input } from '@angular/core';

@Component({
  selector: 'search-bar-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class SearchBarButtonComponent {
  @Input() loading: boolean = false;
}
