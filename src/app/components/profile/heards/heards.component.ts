import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { BreadCrumb } from 'src/app/states-handler/store/breadcrumb.store';

@Component({
  selector: 'profile-heards',
  templateUrl: './heards.component.html',
  styleUrls: ['./heards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeardsComponent {
  @Input() breadcrumb: BreadCrumb[] = []

  breadcrumb$ = this.store.select('breadcrumb');
  constructor(
    private store: Store<any>
  ) {
    this.breadcrumb$.subscribe((data) => {
      this.breadcrumb = data;
    });
  }
}
