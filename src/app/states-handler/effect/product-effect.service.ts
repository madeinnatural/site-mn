import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { FilterClass } from '../store/filter.store';
import { map, mergeMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductModel } from 'src/app/core/domain/model/product/product';
import { loadProducts, loadProductsSuccess, setProducts } from "../store/product.store";


export interface Body<T> {
  filter:    T;
  paginator: Paginator;
  text:      string;
}

export interface FilterRmoura {
  unitId:     string;
  categoryId: string;
  packageId:  string;
  price:      Price;
}

export interface FilterCelmar {
  mainCategoryId: string;
  subCategoryId:  string;
  packageId:      string;
  price:          Price;
}

export interface Price {
  min: number;
  max: number;
}

export interface Paginator {
  page:  number;
  limit: number;
}


@Injectable({
  providedIn: "root"
})
export class ProductEffectService {
  currentProvider: 'RMOURA' | 'CELMAR' = 'CELMAR';
  rmouraBody?: Body<FilterRmoura>;
  celmarBody?: Body<FilterCelmar>;

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<{ currentFilter: FilterClass, provider: 'RMOURA' | 'CELMAR' }>
  ) {
    this.store.select('provider').subscribe(provider => this.currentProvider = provider);
    this.store.select('currentFilter').subscribe(filter => {
      this.rmouraBody = {
        filter: {
          unitId:     filter.unitId,
          categoryId: filter.categoryId,
          packageId:  filter.packageId,
          price:      filter.price
        },
        paginator: {
          page:  filter.page,
          limit: filter.limit
        },
        text: filter.text
      };
      this.celmarBody = {
        filter: {
          mainCategoryId: filter.mainCategoryId,
          subCategoryId:  filter.subCategoryId,
          packageId:      filter.packageId,
          price:          filter.price
        },
        paginator: {
          page:  filter.page,
          limit: 100
        },
        text: filter.text
      };
    });
  }

  loadProducts$ = createEffect(
    ()=> this.actions$.pipe(
      ofType(loadProducts),
      mergeMap(() => {
        const url  = this.currentProvider === 'CELMAR' ? 'pull-products-celmar' : 'pull-products-rmoura';
        const body = this.currentProvider === 'CELMAR' ? this.celmarBody : this.rmouraBody;
        return this.http.post<ProductModel[]>(environment.baseUrl + url, {...body} );
      }),
      tap((products: ProductModel[]) => this.store.dispatch(setProducts({products}))),
      map((products: ProductModel[]) => loadProductsSuccess({products})),
    )
  );
}
