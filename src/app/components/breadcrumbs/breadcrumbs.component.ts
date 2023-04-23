import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent {
  breadcrumb$ = this.store.select('breadcrumb');
  constructor(
    private store: Store<any>
  ) {}
}
