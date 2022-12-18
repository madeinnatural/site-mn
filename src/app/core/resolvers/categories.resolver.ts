import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Categorie } from '../services/SnackService';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class CategoriesResolver implements Resolve<Categorie[]> {

  constructor(public http: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.http.get<Categorie[]>( environment.baseUrl +'products/get_categories_snack');
  }

}
