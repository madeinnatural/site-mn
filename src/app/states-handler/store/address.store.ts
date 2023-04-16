import { createAction, createReducer, on, props } from "@ngrx/store";
import { AddressModel } from "src/app/core/domain/model/account/account";

export enum AddressTypeActions {
  LOAD_ADDRESS          = '[Address] Load Address',
  LOAD_ADDRESS_SUCCESS  = '[Address] Load Address Success',
  LOAD_ADDRESS_FAIL     = '[Address] Load Address Fail',
  SET_ADDRESS           = '[Address] Set Address',
  GET_ADDRESS           = '[Address] Get Address',
}

export const loadAddress = createAction( AddressTypeActions.LOAD_ADDRESS, props<{ payload: AddressModel }>())
export const loadAddressSuccess = createAction( AddressTypeActions.LOAD_ADDRESS_SUCCESS, props<{ payload: AddressModel }>())
export const loadAddressFail = createAction( AddressTypeActions.LOAD_ADDRESS_FAIL, props<{ payload: AddressModel }>())
export const setAddress = createAction( AddressTypeActions.SET_ADDRESS, props<{ payload: AddressModel }>())
export const getAddress = createAction( AddressTypeActions.GET_ADDRESS)

const initializeAddress :AddressModel[]= []

export const addressReducer = createReducer(
  initializeAddress,
  on(loadAddress, (state, action) => {
    return [...state, action.payload]
  }),
  on(loadAddressSuccess, (state, action) => {
    return [...state, action.payload]
  }),
  on(loadAddressFail, (state, action) => {
    return [...state, action.payload]
  }),
  on(setAddress, (state, action) => {
    return [...state, action.payload]
  }),
)
