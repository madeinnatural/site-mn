import { PurchaseHistory } from '../../core/domain/model/financial/purchase-history';
import { createAction, createReducer, on, props } from "@ngrx/store";
import { PurchaseModel } from "src/app/core/domain/model/financial/purchase";
import { CartModel, Order } from "src/app/core/domain/model/logistics/cart";

export interface PurchaseHistoryGroupedByYearMonth  {
  year: {
    label: string;
    total: number;
    month: {
      label: string;
      total: number;
      day: {
        label: string;
        total: number;
        purchases: {
          quantity: number;
          product: CartModel;
        }[]
      }[]
    }[]
  }[]
}


export enum PurchaseActions {

  PUCHASE_ORDER = '[Purchase] PUCHASE_ORDER',
  PUCHASE_ORDER_SUCCESS = '[Purchase] PUCHASE_ORDER_SUCCESS',
  PUCHASE_ORDER_FAIL = '[Purchase] PUCHASE_ORDER_FAIL',

  GET_PURCHASE_ORDER = '[Purchase] GET_PURCHASE_ORDER',
  GET_PURCHASE_ORDER_SUCCESS = '[Purchase] GET_PURCHASE_ORDER_SUCCESS',
  GET_PURCHASE_ORDER_FAIL = '[Purchase] GET_PURCHASE_ORDER_FAIL',

  GET_HISTORY_PURCHASE_ORDER = '[Purchase] GET_HISTORY_PURCHASE_ORDER',
  GET_HISTORY_PURCHASE_ORDER_SUCCESS = '[Purchase] GET_HISTORY_PURCHASE_ORDER_SUCCESS',
  GET_HISTORY_PURCHASE_ORDER_FAIL = '[Purchase] GET_HISTORY_PURCHASE_ORDER_FAIL',

  GET_PURCHASE_ORDER_BY_ID = '[Purchase] GET_PURCHASE_ORDER_BY_ID',
  GET_PURCHASE_ORDER_BY_ID_SUCCESS = '[Purchase] GET_PURCHASE_ORDER_BY_ID_SUCCESS',
  GET_PURCHASE_ORDER_BY_ID_FAIL = '[Purchase] GET_PURCHASE_ORDER_BY_ID_FAIL',

  SET_PURCHASES = '[Purchase] SET_PURCHASES',

}

export const purchaseOrder = createAction(PurchaseActions.PUCHASE_ORDER)
export const purchaseOrderSuccess = createAction(PurchaseActions.PUCHASE_ORDER_SUCCESS, props<{ payload: PurchaseModel }>())
export const purchaseOrderFail = createAction(PurchaseActions.PUCHASE_ORDER_FAIL, props<{ payload: Order[] }>())

export const getPurchaseOrder = createAction(PurchaseActions.GET_PURCHASE_ORDER)
export const getPurchaseOrderSuccess = createAction(PurchaseActions.GET_PURCHASE_ORDER_SUCCESS, props<{ payload: Order[] }>())
export const getPurchaseOrderFail = createAction(PurchaseActions.GET_PURCHASE_ORDER_FAIL, props<{ payload: Order[] }>())

export const getHistoryPurchaseOrder = createAction(PurchaseActions.GET_HISTORY_PURCHASE_ORDER)
export const getHistoryPurchaseOrderSuccess = createAction(PurchaseActions.GET_HISTORY_PURCHASE_ORDER_SUCCESS, props<{ payload: Order[] }>())
export const getHistoryPurchaseOrderFail = createAction(PurchaseActions.GET_HISTORY_PURCHASE_ORDER_FAIL, props<{ payload: Order[] }>())

export const getPurchaseOrderById = createAction(PurchaseActions.GET_PURCHASE_ORDER_BY_ID, props<{ payload: Order[] }>())
export const getPurchaseOrderByIdSuccess = createAction(PurchaseActions.GET_PURCHASE_ORDER_BY_ID_SUCCESS, props<{ payload: Order[] }>())
export const getPurchaseOrderByIdFail = createAction(PurchaseActions.GET_PURCHASE_ORDER_BY_ID_FAIL, props<{ payload: Order[] }>())

export const setPurchases = createAction(PurchaseActions.SET_PURCHASES, props<{ payload: PurchaseModel }>())

export const getPurchaseHistory = createAction(PurchaseActions.GET_HISTORY_PURCHASE_ORDER)
export const getPurchaseHistorySuccess = createAction(PurchaseActions.GET_HISTORY_PURCHASE_ORDER_SUCCESS, props<{ payload: PurchaseHistoryGroupedByYearMonth }>())
export const getPurchaseHistoryFail = createAction(PurchaseActions.GET_HISTORY_PURCHASE_ORDER_FAIL, props<{ payload: PurchaseHistoryGroupedByYearMonth }>())

const initializePurchase: PurchaseModel[] = [];
export const purchaseReducer = createReducer(
  initializePurchase,
  on(setPurchases, (state, { payload }) => {
    return {
      ...state,
      purchases: payload
    }
  }),
  on(purchaseOrderSuccess, (state, { payload }) => {
    return {
      ...state,
      purchases: payload
    }
  }),
)

const initializePurchaseHistory: PurchaseHistoryGroupedByYearMonth[] = []

export const purchaseHistoryReducer = createReducer(
  initializePurchaseHistory,
  on(getPurchaseHistorySuccess,(state, { payload }) => {
    return {
      ...state,
      ...payload
    }
  })
)
