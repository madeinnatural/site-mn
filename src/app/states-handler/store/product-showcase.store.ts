import { createAction, createReducer, on, props } from "@ngrx/store";
import { ProductModel } from "src/app/core/domain/model/product/product";

export interface Showcase {
  selectedQuantity : number;
  itemAdded        : boolean;
  product          : ProductModel;
}

export enum ActionTypesShowcase {
  ADD_PRODUCT    = '[Showcase] Add Product',
  REMOVE_PRODUCT = '[Showcase] Remove Product',
  UPDATE_PRODUCT = '[Showcase] Update Product',
}

export const uploadProductsShowcase = createAction(ActionTypesShowcase.UPDATE_PRODUCT, props<{ products: ProductModel[] }>());


const inicializeState   :Showcase[] = [];
export const productShowcaseReducer = createReducer(
  inicializeState,
  on(uploadProductsShowcase, (state, { products }) => {
    return products.map(product => {
      return {
        selectedQuantity: 0,
        product,
        itemAdded: false
      }
    });
  })
)


