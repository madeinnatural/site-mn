import { createAction, createReducer, props, on } from "@ngrx/store";
import { ProductModel } from "src/app/core/domain/model/product/product";

export interface ProductSale<T> {
  product: ProductModel | T;
  quantity: number;
}

export interface ProductRmoura {
  id: number;
  name: string;
  price: number;
}

export interface ProductCelmar {
  id: number;
  name: string;
  price: number;
}

export interface ProductProvider { productRmoura: ProductSale<ProductRmoura>[], productCelmar: ProductSale<ProductCelmar>[]  }

export const loadProductSalesSuccess = createAction(
  '[Product Sale] Load Product Sales Success',
  props<ProductProvider>()
);

export const loadProductSalesFailure = createAction(
  '[Product Sale] Load Product Sales Failure',
  props<{ error: any }>()
);

const productSaleInitialState: ProductProvider = {
  productRmoura: [],
  productCelmar: []
};

export const productSaleReducer = createReducer(
  productSaleInitialState,
  on(
    loadProductSalesSuccess,
    (state, { productRmoura, productCelmar }) => ({
      ...state,
      productRmoura,
      productCelmar
    })
  )
);


