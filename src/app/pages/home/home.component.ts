import { CartService } from './../../core/services/cart.service';
import { AvancedFilter } from './../../core/model/interfaces/Product';
import { GlobalEventService } from 'src/app/core/services/global.service';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { ServerService } from 'src/app/core/services/server.service';
import { Page } from 'src/app/protocols/products/page';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements Page {
  url: string = '/home';
  title: string = 'Home';

  // products: Observable<ProductsDisplay[]>;

  constructor(
    public aRouter: ActivatedRoute,
    public global: GlobalEventService,
    public server: ServerService,
    public cartService: CartService
  ) {
    // this.products = this.aRouter.data.pipe(map((data) => data['productList']));
  }

  search(data: AvancedFilter) {
    // const response = this.server.search(data);
    // this.products = response.pipe(map((e) => e.data.map((prodR)=> {
    //   return this.cartService.compareCart(prodR);
    // })));
  }
}
