import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CelmarProductFilter, RmouraProductFilter, SpecificationProductsLoaded } from '../model/interfaces/specification-products-loaded';
import { ProductModel } from '../domain/model/product/product';
import { Observable, switchMap, tap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoadedProductProperties, getProductProperties } from 'src/app/states-handler/store/filter.store';
import { Store, select, } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class ProductSaleServiceService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private readonly http: HttpClient,
    private actions$: Actions,
  ) {}

  // getProductsPropsFilter = createEffect(()=> {
  //   return this.actions$.pipe(
  //     ofType(getProductProperties),
  //     switchMap(() => {
  //       return this.filter$.pipe(
  //         tap(filter => {
  //           console.log(filter);
  //         })
  //       )
  //     })
  //   )
  // })
}
