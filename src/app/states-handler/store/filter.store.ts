import { Action, createAction, createReducer, on } from "@ngrx/store";
import { createEffect } from '@ngrx/effects'

export class ActionModel implements Action {
  type:  string = ''
  props?: any
}

export interface LoadedProductProperties {
  filter:    FilterClass;
  paginator: Paginator;
  text:      string;
}

export interface FilterClass {
  mainCategoryId: string;
  subCategoryId:  string;
  unitId:         string;
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

export enum ActionTypesProductProperties {
  'SET_PAGE' = '[Product Properties] Set Page',
  'SET_LIMIT' = '[Product Properties] Set Limit',
  'SET_FILTER_MAIN_CATEGORY' = '[Product Properties] Set Main Category',
  'SET_FILTER_SUB_CATEGORY' = '[Product Properties] Set Sub Category',
  'SET_FILTER_UNIT' = '[Product Properties] Set Unit',
  'SET_FILTER_PACKAGE' = '[Product Properties] Set Package',
  'SET_FILTER_PRICE' = '[Product Properties] Set Price',
  'SET_TEXT' = '[Product Properties] Set Text',
  'GET_PRODUCT_PROPERTIES' = '[Product Properties] Get Product Properties',
}

export const setCurrentPage = createAction(ActionTypesProductProperties.SET_PAGE, (props: LoadedProductProperties) => ({ props }));
export const setCurrentLimit = createAction(ActionTypesProductProperties.SET_LIMIT, (props: LoadedProductProperties) => ({ props }));
export const setPrice = createAction(ActionTypesProductProperties.SET_FILTER_PRICE, (props: Price) => ({ props }));
export const setMainCategorie = createAction(ActionTypesProductProperties.SET_FILTER_MAIN_CATEGORY, (props: string) => ({ props }));
export const setSubCategorie = createAction(ActionTypesProductProperties.SET_FILTER_SUB_CATEGORY, (props: string) => ({ props }));
export const setUnit = createAction(ActionTypesProductProperties.SET_FILTER_UNIT, (props: string) => ({ props }));
export const setPackage = createAction(ActionTypesProductProperties.SET_FILTER_PACKAGE, (props: string) => ({ props }));
export const setText = createAction(ActionTypesProductProperties.SET_TEXT, (props: string) => ({ props }));
export const getProductProperties = createAction(ActionTypesProductProperties.GET_PRODUCT_PROPERTIES, (props: LoadedProductProperties) => ({ props }));

const initialize: LoadedProductProperties = {
  filter:    {
    mainCategoryId: '',
    subCategoryId:  '',
    unitId:         '',
    packageId:      '',
    price:          {
      min: 0,
      max: 1000
    }
  },
  paginator: {
    page:  1,
    limit: 10
  },
  text: ''
}

export const productSieve = createReducer(
  initialize,
  on(setCurrentPage, (state, { props }) => ({ ...state, paginator: { ...state.paginator, page: props.paginator.page } })),
  on(setPrice, (state, { props }) => ({ ...state, filter: { ...state.filter, price: props } })),
  on(setCurrentLimit, (state, { props }) => ({ ...state, paginator: { ...state.paginator, limit: props.paginator.limit } })),
  on(setMainCategorie, (state, { props }) => ({ ...state, filter: { ...state.filter, mainCategoryId: props } })),
  on(setSubCategorie, (state, { props }) => ({ ...state, filter: { ...state.filter, subCategoryId: props } })),
  on(setUnit, (state, { props }) => ({ ...state, filter: { ...state.filter, unitId: props } })),
  on(setPackage, (state, { props }) => ({ ...state, filter: { ...state.filter, packageId: props } })),
  on(setText, (state, { props }) => ({ ...state, text: props })),
);

export interface CelmarCategories {
  filterResponse: FilterResponse;
}

export interface RmouraCategories {
  filterResponse: {
    units: Category[],
    categories: Category[],
    packages: Package[]
  }
}

export interface FilterResponse {
  mainCategory: Category[];
  subCategory:  Category[];
  packages:     Package[];
}

export interface Category {
  id:   string;
  name: string;
}

export interface Package {
  id:        string;
  name:      string;
}

