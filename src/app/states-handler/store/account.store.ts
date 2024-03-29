import { createAction, createReducer, on, props } from "@ngrx/store";
import { AccountModel, AddressModel } from "src/app/core/domain/model/account/account";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  cpfCnpj: string;
}

export enum AccountActionTypes {
  LOGIN           = '[Account] Login',
  LOGIN_SUCCESS   = '[Account] Login Success',
  LOGIN_FAILURE   = '[Account] Login Failure',
  LOGOUT          = '[Account] Logout',
  LOGOUT_SUCCESS  = '[Account] Logout Success',
  SIGNUP          = '[Account] Signup',
  SIGNUP_SUCCESS  = '[Account] Signup Success',
  SIGNUP_FAILURE  = '[Account] Signup Failure',
  UPDATE          = '[Account] Update',
  UPDATE_PERSONAL_INFORMATION = '[Account] Update Personal Information',
  UPDATE_PERSONAL_LOGIN = '[Account] Update Personal Login',
  UPDATE_DATA_ADDRESS = '[Account] Update Data Address',
  UPDATE_DATA_ADDRESS_SUCCESS = '[Account] Update Data Address Success',
}

// LOGIN
export const login        = createAction( AccountActionTypes.LOGIN,           props<{payload     :LoginRequest}>())
export const loginSuccess = createAction( AccountActionTypes.LOGIN_SUCCESS,   props<{accessToken :string}>())
export const loginFailure = createAction( AccountActionTypes.LOGIN_FAILURE,   props<{message     :string}>())
// SIGNUP
export const signup        = createAction( AccountActionTypes.SIGNUP,         props<{payload     :SignupRequest}> ())
export const signupSuccess = createAction( AccountActionTypes.SIGNUP_SUCCESS, props<{accessToken :string}> ())
export const signupFailure = createAction( AccountActionTypes.SIGNUP_FAILURE, props<{message :string}> ())
// LOGOUT
export const logout        = createAction( AccountActionTypes.LOGOUT )
export const logoutSuccess = createAction( AccountActionTypes.LOGOUT_SUCCESS )

// UPDATE ACCOUNT
export const updateAccount = createAction( AccountActionTypes.UPDATE, props<{account: AccountModel}>())

// API CALLS
export const updatePersonalInformation = createAction( AccountActionTypes.UPDATE_PERSONAL_INFORMATION, props<{payload: {
  name: string;
  phone: string;
  cpfCnpj: string;
}}>());

export const updatePersonalLogin = createAction( AccountActionTypes.UPDATE_PERSONAL_LOGIN, props<{ payload: {
  email: string;
  password: string;
}}>());

export const updateDataAddress = createAction( AccountActionTypes.UPDATE_DATA_ADDRESS, props<{ payload: AddressModel }>());

const initializeAccount: AccountModel = {
  id: '',
  name: '',
  email: '',
  phone: '',
  cpfCnpj: '',
  password: '',
  accessToken: '',
  address: [{
    id      : '',
    street  : '',
    number  : '',
    district: '',
    city    : '',
    state   : '',
    zipCode : '',
  }]
}

export const accountReducer = createReducer(
  initializeAccount,
  on(updateAccount, (state, action) => {
    return { ...action.account }
  }),
)


export interface PayloadAddres {
  address: string
  number: string
  complement: string
  district: string
  city: string
  state: string
  zipCode: string
}

export interface PayloadPersonal {
  name: string
  phone: string
  cpfCnpj: string
}

export interface PayloadLogin {
  email: string
  password: string
}
