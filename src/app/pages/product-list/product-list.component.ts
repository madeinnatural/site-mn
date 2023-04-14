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

  query: string = '-1';

  products$: Observable<ProductList[]> = new Observable();

  current_page: number = 0;

  loading: boolean = false;

  paginationData: Array<number> = [];

  currentPage: number = 0;
  totalPage: number = 0;

  props$ = this.store.pipe<{
    currentPage: number
    totalPages: number
  }>(select('propsPage'))
  constructor(
    private router: Router,
    private server: ServerService,
    private cookieService: CookieService,
    public globalEventService: GlobalEventService,
    private store: Store<any>
  ) {
    this.query = this.getQueryParams();
    this.pullProducts()

    this.props$.subscribe(props => {
      this.currentPage = props.currentPage
      console.log(props.totalPages)
      this.totalPage = props.totalPages
    });
  }

  hidderPagination: boolean = false;
  moreProduct = false;

  getQueryParams () {
    const { query } = (this.router.getCurrentNavigation()?.extractedUrl.queryParams as any);
    return query;
  }

  async pullProducts(page?: number) {
    if(page || page == 0) this.current_page = page;
    // this.products$ = this.server.getProductListQuery(this.query, this.current_page).pipe(map(products => this.init(products)));
  }

  init(products: DataSearch) {
    this.moreProduct = products.more_product;
    // return this.productService.veryfy_product_in_cart(products.data);
  }

  addItemCart(product: ProductList) {
    // this.productService.addItem(product.id);
  }

  removeItem(product: ProductList) {
    // this.productService.decreseItem(product.id);
  }

  initCart(product: ProductList) {
    // this.productService.initCart(product.id);
  }

  keyPress(event: KeyboardEvent) {
    if (this.query.length > 3) {
      setTimeout(() => {
        this.pullProducts();
      },500);
    }
  }

  ngOnInit() {
    this.globalEventService.search.subscribe(() => {
      this.query = this.getQueryParams();
      this.pullProducts();
    })
  }
}
