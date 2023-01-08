import { CartService } from './../../core/services/cart.service';
import { AvancedFilter } from './../../core/model/interfaces/Product';
import { GlobalEventService } from 'src/app/core/services/global.service';
import { Observable, map } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CookieService } from '@ngx-toolkit/cookie';
import { ProductsDisplay, ProductList } from 'src/app/core/model/interfaces/Product';
import { ServerService } from 'src/app/core/services/server.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})


export class HomeComponent implements OnDestroy {
  products: Observable<ProductsDisplay[]>;
  constructor(
    public aRouter: ActivatedRoute,
    public global: GlobalEventService,
    public server: ServerService,
    public cartService: CartService
  ) {
    this.products = this.aRouter.data.pipe(map((data) => data['productList']));
  }

  search(data: AvancedFilter) {
    const response = this.server.search(data);
    this.products = response.pipe(map((e) => e.data.map((prodR)=> {
      return this.cartService.compareCart(prodR);
    })));
  }

  ngOnDestroy() {
    // this.global.counterBar.emit({ totalPrice: 0, quantity: 0})
  }
}
