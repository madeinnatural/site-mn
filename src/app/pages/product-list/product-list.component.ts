import { DataSearch } from '../../core/model/interfaces/Product';
import { Observable, map } from 'rxjs';
import { GlobalEventService } from './../../core/services/global.service';
import { ServerService } from '../../core/services/server.service';
import { CookieService } from '@ngx-toolkit/cookie';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductList } from 'src/app/core/model/interfaces/Product';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  currentPage: number = 0;
  totalPage: number = 0;
  props$ = this.store.pipe<{
    currentPage: number
    totalPages: number
  }>(select('propsPage'))
  constructor(
    private router: Router,
    private store: Store<any>
  ) {
    this.props$.subscribe(props => {
      this.currentPage = props.currentPage
      this.totalPage = props.totalPages
    });
  }

  hidderPagination: boolean = false;
  moreProduct = false;

  getQueryParams () {
    const { query } = (this.router.getCurrentNavigation()?.extractedUrl.queryParams as any);
    return query;
  }

  ngOnInit() {}
}
