import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SnackProduct } from './../model/interfaces/Product';
import { Categorie, Filter } from './../services/SnackService';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class SnackResolve implements Resolve<{product: SnackProduct[], categeories: Categorie[]}> {

  constructor(
    public http: HttpClient
  ) { }

  resolve(route: ActivatedRouteSnapshot): any {
    return {
      product: this.getProductSnacks(),
      categeories: this.getCategories()
    }
  }

  getProductSnacks () {
    const termo = '';
    const filter: Filter = {
      categoryId: -1,
      price: {
        priceMin: 0,
        priceMax: 100
      },
      weight: {
        weightMin: 0,
        weightMax: 100
      }
    }
    return this.http.get<Promise<Categorie[]>>( environment.baseUrl +'products/get_products_snack', {params: {termo, filter: JSON.stringify(filter)}});
  }

  getCategories () {
    return this.http.get<Promise<Categorie[]>>( environment.baseUrl +'products/get_categories_snack');
  }

}
