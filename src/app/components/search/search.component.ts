import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mn-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {

  @Input() type: 'row' = 'row';
  @Input() termo = '';
  @Output() goSearch = new EventEmitter<string>();

  keyPress(event: KeyboardEvent) {
    if (this.termo.length > 3) {
      setTimeout(() => {
        this.goSearch.emit(this.termo);
      },500);
    }
  }
}
