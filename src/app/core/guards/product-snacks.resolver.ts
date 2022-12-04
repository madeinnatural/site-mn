import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SnackProduct } from './../model/interfaces/Product';
import { Categorie } from './../services/SnackService';
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
    return this.http.get<Promise<Categorie[]>>( environment.baseUrl +'products/get_products_snack');
  }

  getCategories () {
    return this.http.get<Promise<Categorie[]>>( environment.baseUrl +'products/get_categories_snack');
  }

}
