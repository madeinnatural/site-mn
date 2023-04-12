import { FilterClass, currentFilter, setCurrentPage, setText } from './../../states-handler/store/filter.store';
import { Submitable } from './../mn-form/mn-form.component';
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { debounceTime, Observable, Subject } from 'rxjs';

@Component({
  selector: 'mn-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {

  @Input() placeholder: string = '';
  @Input() termo: string = '';
  @Input() loading: boolean = false;

  @Output() clickAdvencedFilterEvent = new EventEmitter<void>();
  clickAdvencedFilter() {
    this.clickAdvencedFilterEvent.emit();
  }

  @Output() goSearch = new EventEmitter<string>();

  private termoSubject: Subject<string> = new Subject<string>();

  constructor(
    private store: Store<{currentFilter: FilterClass}>
  ) {
    this.termoSubject
      .pipe(debounceTime(500))
      .subscribe(termo => this.goSearch.emit(termo));
  }

  async keyPress(event?: KeyboardEvent) {
    if (event) {
      this.termo = (event.target as HTMLInputElement).value;
      if (event.key == 'Enter' || this.termo.length >= 3) {
        this.store.dispatch(setText({props: this.termo}))
      }
    } else {
      if (this.termo.length >= 3) {
        this.store.dispatch(setText({props: this.termo}))
      }
    }
  }
}
