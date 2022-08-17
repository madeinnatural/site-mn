import { Observable } from 'rxjs';
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

  query: string = '';

  products$: Observable<ProductList[]>;

  current_page: number = 1;

  loading: boolean = false;

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

    this.products$ = this.server.getProductListQuery(this.query, this.current_page);

    console.log(this.products$)

    this.globalEventService.pullProductList.subscribe( async (query: string)=> {

      this.current_page = 0;

      this.query = query;

      this.pullProducts();

    })

  }

  async pullProducts() {
    this.products$ = this.server.getProductListQuery(this.query, this.current_page);
  }



  ngOnInit() {

  }

  ngOnDestroy() {
    this.globalEventService.pullProductList.unsubscribe();
  }

}
