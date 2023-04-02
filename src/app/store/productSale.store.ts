import { createAction, createReducer, props, on } from "@ngrx/store"
import { Product } from "../core/model/interfaces/Product";

export interface ProductSale {
  product: Product;
  quantity: number;
}

export const loadProductSalesSuccess = createAction(
  '[Product Sale] Load Product Sales Success',
  props<{ productSales: ProductSale[] }>()
);

export const loadProductSalesFailure = createAction(
  '[Product Sale] Load Product Sales Failure',
  props<{ error: any }>()
);

const startProductSale: ProductSale[] = [];

export const productSaleReducer = createReducer(
  startProductSale,
  on(loadProductSalesSuccess, (state, { productSales }) => ([...productSales]))
);


