import { CartService } from './../../core/services/cart.service';
import { AvancedFilter, Product } from './../../core/model/interfaces/Product';
import { GlobalEventService } from 'src/app/core/services/global.service';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { ServerService } from 'src/app/core/services/server.service';
import { Store } from '@ngrx/store';
import { Order } from 'src/app/core/domain/model/logistics/cart';
import { Observable } from 'rxjs';
import { ProductSale } from 'src/app/states-handler/store/productSale.store';
import { ProductSaleServiceService } from 'src/app/core/services/product-sale-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent {

  orders: Order[] = [];
  products: Observable<ProductSale[]>;

  constructor(
    public aRouter: ActivatedRoute,
    public global: GlobalEventService,
    public server: ServerService,
    public cartService: CartService,
    private store: Store<{ productsSale: ProductSale[] }>,
    private productSale: ProductSaleServiceService
  ) {
    this.products = this.store.select('productsSale')
    this.products.subscribe((data) => {
      console.log('aqui products',data)
    })
    const products = productSale.getProductsSale('rmoura');
    products.subscribe((data) => {
      console.log('aqui products =>',data)
    })
  }

  search(data: AvancedFilter) {
  }
}
