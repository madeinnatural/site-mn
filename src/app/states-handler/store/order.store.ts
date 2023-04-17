import { createAction, createReducer, on, props } from "@ngrx/store"
import { Order } from "../../core/domain/model/logistics/cart"

export enum OrderActions {
  ADD_ORDER = '[Order] Add Order',
  REMOVE_ORDER = '[Order] Remove Order',
  UPDATE_ORDER = '[Order] Update Order',
  GET_ORDER = '[Order] Get Order',
  CLEAR_ORDER = '[Order] Clear Order',
  REMOVE_ALL_PRODUCT_WITH_ID = '[Order] Remove All Product With Id'
}

export const addProductOrder = createAction(OrderActions.ADD_ORDER, props<{ productId: string }>())
export const removeProductOrder = createAction(OrderActions.REMOVE_ORDER, props<{ productId: string }>())
export const updateProductOrder = createAction(OrderActions.UPDATE_ORDER, props<{ productId: string, quantity: number }>())
export const getProductOrder = createAction(OrderActions.GET_ORDER)
export const clearProductOrder = createAction(OrderActions.CLEAR_ORDER)
export const removeAllProductWithId = createAction(OrderActions.REMOVE_ALL_PRODUCT_WITH_ID, props<{ productId: string }>())

const startOrder: Order[] = []

export const orderReducer = createReducer(
  startOrder,
  on(addProductOrder, (state, { productId }) => {
    const orderExist = state.find(o => o.productId === productId);
    if (orderExist) {
      return state.map(o => {
        if (o.productId === productId) {
          return {
            ...o,
            quantity: o.quantity + 1
          }
        }
        return o;
      })
    }
    return [...state, { productId, quantity: 1 }]
  }),
  on(removeProductOrder, (state, { productId }) => {
    const order = state.find(o => o.productId === productId);
    if (order) {
      if (order.quantity > 1) {
        return state.map(o => {
          if (o.productId === productId) {
            return {
              ...o,
              quantity: o.quantity - 1
            }
          }
          return o;
        })
      }
      return state.filter(o => o.productId !== productId);
    }
    return state
  }),
  on(updateProductOrder, (state, { productId, quantity }) => {
    return state.map(o => {
      if (o.productId === productId) {
        return {
          ...o,
          quantity
        }
      }
      return o;
    })
  }),
  on(getProductOrder, (state) => {
    return state;
  }),
  on(clearProductOrder, (state) => {
    return [];
  }),
  on(removeAllProductWithId, (state, { productId }) => {
    return state.filter(o => o.productId !== productId);
  })
)
