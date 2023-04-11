import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Category, FilterClass, ListFilter } from 'src/app/states-handler/store/filter.store';
import { interval } from 'rxjs';

@Component({
  selector: 'app-select-filter',
  templateUrl: './select-filter.component.html',
  styleUrls: ['./select-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectFilterComponent {
  @Input() title = '';
  @Input() filters?: Category[]
  @Input() currentFilterID?: string;

  @Output() changeFilterEmit  = new EventEmitter<string>();

  constructor() {
    console.log('SELECT FILTER: ', this.filters);
  }

  changeFilter(event: {target: any}) {
    const filterId = event.target.value as string;
    this.changeFilterEmit.emit(filterId);
  }
}
