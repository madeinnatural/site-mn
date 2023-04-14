import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { FilterClass } from '../store/filter.store';
import { map, mergeMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductModel } from 'src/app/core/domain/model/product/product';
import { loadProducts, loadProductsSuccess, setProducts, setPropsPage } from "../store/product.store";
import { uploadProductsShowcase } from "../store/product-showcase.store";
import { Order } from "src/app/core/domain/model/logistics/cart";


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

export interface ResponseDataProducts {
  currentPage: number;
  totalPages: number;
  products: ProductModel[]
}

@Injectable({
  providedIn: "root"
})
export class ProductEffectService {
  currentProvider: 'RMOURA' | 'CELMAR' = 'CELMAR';
  rmouraBody?: Body<FilterRmoura>;
  celmarBody?: Body<FilterCelmar>;
  orders: Order[] = [];

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<{ currentFilter: FilterClass, provider: 'RMOURA' | 'CELMAR', order: Order[] }>
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
    this.store.select('order').subscribe(order => {
      this.orders = order;
    });
  }

  loadProducts$ = createEffect(
    ()=> this.actions$.pipe(
      ofType(loadProducts),
      mergeMap(() => {
        const url  = this.currentProvider === 'CELMAR' ? 'pull-products-celmar' : 'pull-products-rmoura';
        const body = this.currentProvider === 'CELMAR' ? this.celmarBody : this.rmouraBody;
        return this.http.post<ResponseDataProducts>(environment.baseUrl + url, {...body} );
      }),
      map((response: ResponseDataProducts) => {
        this.store.dispatch(setPropsPage({ currentPage: response.currentPage, totalPages: response.totalPages}))
        return response.products;
      }),
      tap((products: ProductModel[]) => this.store.dispatch(uploadProductsShowcase({products, orders: this.orders}))),
      map((products: ProductModel[]) => loadProductsSuccess({products})),
    )
  );
}
