import { GlobalEventService } from 'src/app/core/global/global.service';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SnackProduct } from '../model/interfaces/Product';
import { Categorie, Filter } from '../services/SnackService';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class SnackResolve implements Resolve<SnackProduct[]> {

  constructor(
    public http: HttpClient,
    public global: GlobalEventService
    ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<SnackProduct[]> {
    this.global.loading.emit(true)
    return this.getProductSnacks()
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
    const response = this.http.get<SnackProduct[]>( environment.baseUrl +'products/get_products_snack', {params: {termo, filter: JSON.stringify(filter)}})
    .pipe(map((res: SnackProduct[]) => res.filter((item: any) => item.active)))
    this.global.loading.emit(false)
    return response;
  }

}
