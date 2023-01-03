import { GlobalEventService } from 'src/app/core/services/global.service';
import { Observable, map } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CookieService } from '@ngx-toolkit/cookie';
import { ProductsDisplay, ProductList } from 'src/app/core/model/interfaces/Product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})


export class HomeComponent implements OnDestroy {
  products: Observable<ProductsDisplay[]>;
  constructor(public aRouter: ActivatedRoute, public global: GlobalEventService) {
    this.products = this.aRouter.data.pipe(map((data) => data['productList']));
  }

  ngOnDestroy() {
    // this.global.counterBar.emit({ totalPrice: 0, quantity: 0})
  }
}
