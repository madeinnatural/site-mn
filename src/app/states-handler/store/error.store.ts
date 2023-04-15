import { createReducer, on } from "@ngrx/store";
import { loginFailure } from "./account.store";

export interface ErrorStore {
  error: string,
  trace: string,
}

const initializerError: ErrorStore = {
  error: '',
  trace: '',
}

export const errorReducer = createReducer(
  initializerError,
  on(loginFailure, (states,action) => {
    return {
      error:  action.message,
      trace: 'LOGIN_FAILURE',
    }
  })
)
