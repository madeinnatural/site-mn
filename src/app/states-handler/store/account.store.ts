import { createAction, createReducer, on, props } from "@ngrx/store";
import { AccountModel } from "src/app/core/domain/model/account/account";

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

const initializeAccount: AccountModel = {
  id: '',
  name: '',
  email: '',
  phone: '',
  cpfCnpj: '',
  password: '',
}
export const accountReducer = createReducer(
  initializeAccount,
  on(updateAccount, (state, action) => {
    return { ...action.account }
  })
)


