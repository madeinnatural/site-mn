import { ProductModel } from 'src/app/components/products-cart/imports';
import { CartModel, Order } from './../../core/domain/model/logistics/cart';
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

export const addItem = createAction(CartActionTypes.ADD_ITEM, props<{ product: ProductModel }>());
export const removeItem = createAction(CartActionTypes.REMOVE_ITEM, props<{ product: ProductModel  }>());
export const updateItem = createAction(CartActionTypes.UPDATE_ITEM, props<{ product: ProductModel  }>());
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
  on(addItem, (state, { product }) => {
    const productStore = state.cartItem.find(item => item.id === product.id);
    if (productStore) {
      return {
        ...state,
        orders: state.orders.map(order => {
          if (order.productId === product.id) {
            return {
              ...order,
              quantity: order.quantity + 1
            }
          }
          return order;
        }),
        cartItem: state.cartItem.map(item => {
          if (item.id === product.id) {
            return {
              ...item,
            }
          }
          return item;
        }),
        total: state.total + product.price
      }
    }
    return {
      ...state,
      total: state.total + product.price,
      cartItem: [...state.cartItem, product],
      orders: [...state.orders, { productId: product.id, quantity: 1 }]
    }
  }),
  on(removeItem, (state, { product }) => {
    const productStore = state.cartItem.find(item => item.id === product.id);
    if (productStore) {
      return {
        ...state,
        orders: state.orders.map(order => {
          if (order.productId === product.id) {
            return {
              ...order,
              quantity: order.quantity - 1
            }
          }
          return order;
        }),
        cartItem: state.cartItem.map(item => {
          if (item.id === product.id) {
            return {
              ...item,
            }
          }
          return item;
        }),
        total: state.total - product.price
      }
    }
    return {
      ...state,
      total: state.total - product.price,
      cartItem: [...state.cartItem, product],
      orders: [...state.orders, { productId: product.id, quantity: 1 }]
    }
  }),
  on(updateItem, (state, { product }) => {
    return state
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
