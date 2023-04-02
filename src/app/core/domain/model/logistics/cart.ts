import { AccountModel } from "../account/account"
import { ProductModel } from "../product/product"

export interface Order {
  producId: string,
  quantity: number
}

export interface CartItem {
  id: string,
  product: ProductModel,
  quantity: number
}

export interface CartModel {
  id: string,
  account: AccountModel
  cartItem: CartItem[],
  total: number
}
