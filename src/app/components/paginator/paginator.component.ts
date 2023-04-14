import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { setCurrentPage } from '../products-cart/imports';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent {
  @Input() _currentPage = 0
  @Input() totalPage = 0

  get currentPage() {
    return this._currentPage
  }

  set currentPage (page: number) {
    console.log(page)
    this._currentPage = page
    this.store.dispatch(setCurrentPage({page: page}))
  }

  constructor(
    private store :Store<{propsPage: {
      currentPage: number
      totalPages: number
    }}>
  ) {}

}
