import { ProductService } from './../global/product.service';
import { ServerService } from './../server/server.service';
import { SnackProduct } from './../model/interfaces/Product';
import { Injectable } from '@angular/core';
import { GlobalEventService } from '../global/global.service';
import { CookieService } from '@ngx-toolkit/cookie';

export interface Filter {
  categoryId: number,
  price: {
    priceMin: number,
    priceMax: number
  },
  weight: {
    weightMin: number,
    weightMax: number
  }
}

export interface Categorie {
  id: number,
  name: string
}

@Injectable({ providedIn: 'root' })
export class SnackService {

  private _productInCart: SnackProduct[] = [];
  get productInCart(): SnackProduct[] {
    return this._productInCart;
  }

  set productInCart(list: SnackProduct[]) {
    this._productInCart = list;
  }

  filter: Filter = {
    categoryId: -1,
    price: {
      priceMin: 0,
      priceMax: 100
    },
    weight: {
      weightMin: 0,
      weightMax: 100,
    }
  }

  categories: Categorie[] = [];

  constructor(
    public server: ServerService,
    public productService: ProductService,
    public cookie: CookieService,
    public global: GlobalEventService
  ) {
  }

}
