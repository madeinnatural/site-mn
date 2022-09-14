import { Item } from './../../core/model/Product';
import { Observable, map } from 'rxjs';
import { GlobalEventService } from './../../core/global/global.service';
import { ProductService } from './../../core/global/product.service';
import { ServerService } from './../../core/server/server.service';
import { CookieService } from '@ngx-toolkit/cookie';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductList } from 'src/app/core/model/Product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  query: string = '-1';

  products$: Observable<ProductList[]>;

  current_page: number = 1;

  loading: boolean = false;

  paginationData: Array<number> = [];

  constructor(
    private router: Router,
    private server: ServerService,
    private cookieService: CookieService,
    public productService: ProductService,
    public globalEventService: GlobalEventService
  ) {

    const data = router.getCurrentNavigation()?.extractedUrl.queryParams;

    const { query } = data as any;

    if (query) {
      this.query = query;
    } else {
      this.query = '';
    }

    this.products$ = this.query != "" ? this.server.getProductListQuery(this.query, this.current_page) : this.server.getProductListQuery(this.query);

    this.globalEventService.pullProductList
    .subscribe( async (query: string)=> {
      this.current_page = 0;
      this.query = query;
      this.pullProducts();
    })

    this.globalEventService.search
    .subscribe(() => {
      const data = this.router.getCurrentNavigation()?.extras.queryParams;
      this.query = (data as any).query
      this.pullProducts();
    })

  }

  hidderPagination: boolean = false;

  async pullProducts() {
    this.products$ = this.server.getProductListQuery(this.query, this.current_page).pipe(
      map((products) => {
        return products.map(e => {
          return {
            amount: e.amount,
            categoria: e.categoria,
            id: e.id,
            product_name: e.product_name,
            price: e.price,
            provider: e.provider,
            provider_primary: e.provider_primary,
            provider_tertiary: e.provider_tertiary,
            unit: e.unit,
            weight: e.weight,
          }
        })
      })
    ).pipe(products => {
      products.subscribe((e) => {
        if (e.length > 0) {
          this.hidderPagination = true;
        } else {
          this.hidderPagination = false;
        }
      })
      return products;
    })
  }

  addItemCart(product: ProductList) {
    this.productService.addItemCart(product);
  }

  removeItem(product: ProductList) {
    const create_item = new Item(product.id,product, product.amount, product.price);
    this.productService.decreaseItemCart(create_item);
  }

  initCart(product: ProductList) {
    this.productService.initCart(product);
  }


  ngOnInit() {}
}
