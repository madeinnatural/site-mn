import { GlobalEventService } from 'src/app/core/services/global.service';
import { CartService } from './../services/cart.service';
import { from, map, Observable } from 'rxjs';
import { ProductsDisplay } from './../model/interfaces/Product';
import { HttpService } from './../services/http.service';
import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductListResolver implements Resolve<Observable<ProductsDisplay[]>> {

  constructor(
    private httpService: HttpService,
    private cartService: CartService,
  ) { }

  resolve() {
    return this.httpService.getProductListEditaveis().pipe(map((res)=> {
      return res.map((item) => {
        return this.cartService.compareCart(item)
      })
    }));
  }

}
