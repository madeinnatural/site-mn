import { createReducer } from "@ngrx/store"
import { Order } from "../../core/domain/model/logistics/cart"

const startOrder: Order[] = []

export const orderReducer = createReducer(startOrder)
