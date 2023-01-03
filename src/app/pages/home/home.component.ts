import { Observable, map } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CookieService } from '@ngx-toolkit/cookie';
import { ProductsDisplay, ProductList } from 'src/app/core/model/interfaces/Product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})


export class HomeComponent {
  products: Observable<ProductsDisplay[]>;
  constructor(public aRouter: ActivatedRoute) {
    this.products = this.aRouter.data.pipe(map((data) => data['productList']));
  }
}
