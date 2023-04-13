import { createAction, createReducer, on, props } from "@ngrx/store";
import { Order } from "src/app/core/domain/model/logistics/cart";
import { ProductModel } from "src/app/core/domain/model/product/product";

export interface Showcase {
  selectedQuantity : number;
  itemAdded        : boolean;
  product          : ProductModel;
}

export enum ActionTypesShowcase {
  ADD_PRODUCT       = '[Showcase] Add Product',
  REMOVE_PRODUCT    = '[Showcase] Remove Product',
  UPDATE_PRODUCT    = '[Showcase] Update Product',
  REMOVE_PRODUCTS   = '[Showcase] Remove Products',
  SET_PROPS_PRODUCT = '[Showcase] Set Props Product',
}

export const uploadProductsShowcase = createAction(ActionTypesShowcase.UPDATE_PRODUCT,    props<{ products : ProductModel[], orders: Order[] }>());
export const addProductShowcase     = createAction(ActionTypesShowcase.SET_PROPS_PRODUCT, props<{ product  : ProductModel }>());
export const removeProductShowcase  = createAction(ActionTypesShowcase.REMOVE_PRODUCT,    props<{ product  : ProductModel }>());

const inicializeState   :Showcase[] = [];
export const productShowcaseReducer = createReducer(
  inicializeState,
  on(uploadProductsShowcase, (state, { products, orders }) => {
    return products.map(product => {
      const order = orders.find(item => item.productId == product.id);
      if (!order) return ({ selectedQuantity: 0, product, itemAdded: false });
      return {
        selectedQuantity: order?.quantity || 0,
        product,
        itemAdded: order.quantity > 0 || false
      }
    });
  }),
  on(addProductShowcase, (state, { product }) => {
    let productsShowcase = state.find(item => item.product.id === product.id);
    if (productsShowcase) {
      productsShowcase.selectedQuantity += 1;
      productsShowcase.itemAdded = true;
    }
    return state
  }),
  on(removeProductShowcase, (state, { product }) => {
    let productsShowcase = state.find(item => item.product.id === product.id);
    if (productsShowcase) {
      if (productsShowcase.selectedQuantity > 1) {
        productsShowcase.selectedQuantity -= 1;
      } else {
        productsShowcase.selectedQuantity = 0;
        productsShowcase.itemAdded = false;
      }
    } else {
      state = state.filter(item => item.product.id !== product.id);
    }
    return state
  })
)


