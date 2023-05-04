import { FilterClass, setText } from './../../states-handler/store/filter.store';
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { debounceTime, Subject } from 'rxjs';

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

  private termoSubject: Subject<string> = new Subject<string>();

  constructor(private store: Store<{ currentFilter: FilterClass }>) {
    this.termoSubject
      .pipe(debounceTime(800))
      .subscribe((termo: string) => {
        this.store.dispatch(setText({ props: termo }));
      });
  }

  clickAdvencedFilter() {
    this.clickAdvencedFilterEvent.emit();
  }

  keyPress(event?: KeyboardEvent) {
    if (event) {
      this.termo = (event.target as HTMLInputElement).value;
      if (event.key == 'Enter' || this.termo.length >= 3) {
        this.termoSubject.next(this.termo);
      }
    } else {
      if (this.termo.length >= 3) {
        this.termoSubject.next(this.termo);
      }
    }
  }

}
