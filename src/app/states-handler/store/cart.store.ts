import { CartModel } from './../../core/domain/model/logistics/cart';
import { createAction, createReducer, on, props } from "@ngrx/store";

export enum CartActionTypes {
  'ADD_ITEM' = '[Cart] Add Item',
  'REMOVE_ITEM' = '[Cart] Remove Item',
  'UPDATE_ITEM' = '[Cart] Update Item',
  'CLEAR_CART' = '[Cart] Clear Cart',

  'LOAD_CART' = '[Cart] Load Cart',
  'LOAD_CART_SUCCESS' = '[Cart] Load Cart Success',
  'LOAD_CART_FAILURE' = '[Cart] Load Cart Failure',
}

export const addItem = createAction(CartActionTypes.ADD_ITEM, props<{ productId: string }>());
export const removeItem = createAction(CartActionTypes.REMOVE_ITEM, props<{ productId: string }>());
export const updateItem = createAction(CartActionTypes.UPDATE_ITEM, props<{ productId: string }>());
export const clearCart = createAction(CartActionTypes.CLEAR_CART);

export const loadCart = createAction(CartActionTypes.LOAD_CART);
export const loadCartSuccess = createAction(CartActionTypes.LOAD_CART_SUCCESS);
export const loadCartFailure = createAction(CartActionTypes.LOAD_CART_FAILURE, props<{ error: any }>());
export const updateCart = createAction(CartActionTypes.LOAD_CART_SUCCESS, props<{ cart: CartModel[] }>());


const initializeCartItem: CartModel = {
  id: '',
  cartItem: [],
  orders: [],
  total: 0
}
export const cartReducer = createReducer(
  initializeCartItem,
  on(addItem, (state, { productId }) => {
    const orderExist = state.orders.find(order => order.productId === productId);
    if (orderExist) {
      return {
        ...state,
        orders: state.orders.map(order => {
          if (order.productId === productId) {
            return {
              ...order,
              quantity: order.quantity + 1
            }
          }
          return order;
        })
      }
    }
    return {
      ...state,
      orders: [...state.orders, { productId, quantity: 1 }]
    }
  }),
  on(removeItem, (state, { productId }) => {
    return {
      ...state,
      orders: state.orders.filter(order => order.productId !== productId)
    }
  }),
  on(updateItem, (state, { productId }) => {
    return {
      ...state,
      orders: state.orders.map(order => {
        if (order.productId === productId) {
          return {
            ...order,
            quantity: order.quantity + 1
          }
        }
        return order;
      })
    }
  }),
  on(clearCart, (state) => {
    return {
      ...state,
      orders: []
    }
  }),
  on(loadCart, (state) => {
    return {
      ...state,
    }
  }),
  on(loadCartSuccess, (state) => {
    return {
      ...state,
    }
  }),
  on(loadCartFailure, (state, { error }) => {
    console.error('ERROR AO TENTAR CARREGAR CARRINHO DO API:',error);
    return {
      ...state,
    }
  }),
  on(updateCart, (state, { cart }) => {
    return {
      ...state,
      ...cart
    }
  })
)
