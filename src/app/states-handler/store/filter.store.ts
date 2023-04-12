import { Action, createAction, createReducer, createSelector, on, props } from "@ngrx/store";

const initialize: LoadedProductProperties = {
  filter:    {
    mainCategoryId :'',
    categoryId     :'',
    subCategoryId  :'',
    unitId         :'',
    packageId      :'',
    price:         { min: 0, max: 1000 },
    text           :'',
    page           :1,
  },
  paginator: {
    page:  1,
    limit: 10
  },
  text: ''
}

export enum ActionTypesProductProperties {
  'SET_PAGE'                  = '[Product Properties] Set Page',
  'SET_LIMIT'                 = '[Product Properties] Set Limit',
  'SET_FILTER_MAIN_CATEGORY'  = '[Product Properties] Set Main Category',
  'SET_FILTER_SUB_CATEGORY'   = '[Product Properties] Set Sub Category',
  'SET_FILTER_UNIT'           = '[Product Properties] Set Unit',
  'SET_FILTER_PACKAGE'        = '[Product Properties] Set Package',
  'SET_FILTER_PRICE'          = '[Product Properties] Set Price',
  'SET_TEXT'                  = '[Product Properties] Set Text',
  'GET_PRODUCT_PROPERTIES'    = '[Product Properties] Get Product Properties',
  'CHANGE_PROVIDER'           = '[Product Properties] Change Provider',
  'GET_FILTERS'               = '[Product Properties] Get Filters',
  'SUCCESS_LOAD_FILTER'       = '[Product Properties] Success Load Filter',
  'SET_FILTERS'               = '[Product Properties] Set Filters',
  'GET_FILTERS_STORE'         = '[Product Properties] Get Filters Store',
  'SET_FILTER_CATEGORY'       = '[Product Properties] Set Category',
}

export const setCurrentLimit        = createAction(ActionTypesProductProperties.SET_LIMIT, props<LoadedProductProperties>());
export const setMainCategorie       = createAction(ActionTypesProductProperties.SET_FILTER_MAIN_CATEGORY, props<{props: string}>());
export const setCurrentPage         = createAction(ActionTypesProductProperties.SET_PAGE,  props<{page: number}>());
export const setPrice               = createAction(ActionTypesProductProperties.SET_FILTER_PRICE, props<Price>());
export const setSubCategorie        = createAction(ActionTypesProductProperties.SET_FILTER_SUB_CATEGORY, props<{props: string}>());
export const setUnit                = createAction(ActionTypesProductProperties.SET_FILTER_UNIT, props<{props: string}>());
export const setPackage             = createAction(ActionTypesProductProperties.SET_FILTER_PACKAGE, props<{props: string}>());
export const setText                = createAction(ActionTypesProductProperties.SET_TEXT, props<{props: string}>());
export const getProductProperties   = createAction(ActionTypesProductProperties.GET_PRODUCT_PROPERTIES, props<LoadedProductProperties>());
export const changeProvider         = createAction(ActionTypesProductProperties.CHANGE_PROVIDER, props<{ provider: 'RMOURA' | 'CELMAR' }>());
export const getFilters             = createAction(ActionTypesProductProperties.GET_FILTERS);
export const successLoadFilter      = createAction(ActionTypesProductProperties.SUCCESS_LOAD_FILTER, props<{props: ListFilter }>());

export const setCategory            = createAction(ActionTypesProductProperties.SET_FILTER_CATEGORY, props<{ props: string }>());
export const setFilters             = createAction(ActionTypesProductProperties.SET_FILTERS, props<{ props: ListFilter }>());
export const getFilterAPI           = createAction(ActionTypesProductProperties.GET_FILTERS, props<{ provider: 'RMOURA' | 'CELMAR' }>());
export const getFilterStore         = createAction(ActionTypesProductProperties.GET_FILTERS_STORE);



const initializeCurrentFilter: FilterClass = {
  mainCategoryId: '',
  subCategoryId:  '',
  categoryId:     '',
  unitId:         '',
  packageId:      '',
  price:          {
    min: 0,
    max: 1000
  },
  text:           '',
  page:            1,
}

export const currentFilter = createReducer<FilterClass>(
  initializeCurrentFilter,
  on(setMainCategorie,  (state, { props })    => ({ ...state, mainCategoryId: props })),
  on(setCategory,       (state, { props })    => ({ ...state, categoryId: props })),
  on(setSubCategorie,   (state, { props })    => ({ ...state, subCategoryId: props })),
  on(setUnit,           (state, { props })    => ({ ...state, unitId: props })),
  on(setPackage,        (state, { props })    => ({ ...state, packageId: props })),
  on(setPrice,          (state, { min, max }) => ({ ...state, price: { min, max } })),
  on(setText,           (state, { props })    => ({ ...state, text: props })),
  on(setCurrentPage,    (state, { page })     => ({ ...state, page })),
);

const initializeFilter: ListFilter = {
  filterResponse: {
    rmoura: {
      categories: [],
      packages:   [],
      units:      [],
    },
    celmar: {
      mainCategory: [],
      subCategory:  [],
      packages:     []
    }
  }
}

export const filtersProvider = createReducer<ListFilter>(
  initializeFilter,
  on(successLoadFilter, (state, { props }) => ({...props})),
)

export const provider = createReducer(
  'RMOURA',
  on(changeProvider, (state, { provider }) => provider)
);

export interface RmouraCategories {
  filterResponse: {
    units:      Category[],
    categories: Category[],
    packages:    Package[]
  }
}

export interface Filter {
  mainCategory: Category[];
  subCategory:  Category[];
  packages:      Package[];
}

export interface Category {
  id:   string;
  name: string;
}

export interface Package {
  id:        string;
  name:      string;
}

export interface ListFilter {
  filterResponse: FilterResponse;
}

export interface FilterResponse {
  rmoura: Rmoura;
  celmar: Celmar;
}

export interface Celmar {
  mainCategory: Category[];
  subCategory:  Category[];
  packages:      Package[];
}

export interface Category {
  id:   string;
  name: string;
}

export interface Package {
  id:        string;
  name:      string;
  createdAt: string;
  updatedAt: string;
}

export interface Rmoura {
  units:      Package[];
  packages:   Package[];
  categories: Package[];
}

export interface LoadedProductProperties {
  filter:    FilterClass;
  paginator: Paginator;
  text:      string;
}

export interface FilterClass {
  mainCategoryId :string;
  subCategoryId  :string;
  categoryId     :string;
  unitId         :string;
  packageId      :string;
  text           :string;
  page           :number;
  price          :Price;
}

export interface Price {
  min: number;
  max: number;
}

export interface Paginator {
  page:  number;
  limit: number;
}
