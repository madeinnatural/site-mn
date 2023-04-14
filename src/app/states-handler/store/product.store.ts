import { createAction, createReducer, on, props } from "@ngrx/store";
import { ProductModel } from "src/app/core/domain/model/product/product";

export enum ActionTypesProduct {
  LOAD_PRODUCT         = '[Product] Load Product',
  SET_PRODUCT          = '[Product] Set Product',
  GET_PRODUCTS         = '[Product] Get Product',
  LOAD_PRODUCT_SUCCESS = '[Product] Load Product Success',
  SET_PROPS_PAGE       = '[Product] Set Props Page',
}

export const loadProducts = createAction(ActionTypesProduct.LOAD_PRODUCT);
export const getProducts  = createAction(ActionTypesProduct.GET_PRODUCTS);
export const setProducts  = createAction(ActionTypesProduct.SET_PRODUCT, props<{ products: ProductModel[] }>());
export const loadProductsSuccess = createAction(ActionTypesProduct.LOAD_PRODUCT_SUCCESS, props<{ products: ProductModel[] }>());

export const setPropsPage = createAction(ActionTypesProduct.SET_PROPS_PAGE, props<{
  currentPage: number,
  totalPages: number,
}>());

export const propsPageReducer = createReducer(
  { currentPage: 0, totalPages: 1 },
  on(setPropsPage, (state, { currentPage, totalPages }) => ({ currentPage, totalPages }))
)

export const initializeProducts: ProductModel[] = [];
export const productReducer = createReducer(
  initializeProducts,
  on(setProducts, (state, { products }) => products),
)

