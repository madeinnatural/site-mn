import { createAction, createReducer, on, props } from "@ngrx/store";

export interface BreadCrumb {
  label: string;
  url: string;
}

export enum BreadcrumbStoreActionType {
  ADD_BREADCRUMB = '[Breadcrumb] Add Breadcrumb',
  REMOVE_BREADCRUMB = '[Breadcrumb] Remove Breadcrumb',
  UPDATE_BREADCRUMB = '[Breadcrumb] Update Breadcrumb',
  CLEAR_BREADCRUMB = '[Breadcrumb] Clear Breadcrumb',
  LOAD_BREADCRUMB = '[Breadcrumb] Load Breadcrumb',
}

export const addBreadcrumb = createAction(BreadcrumbStoreActionType.ADD_BREADCRUMB, props<{ breadcrumb: BreadCrumb[] }>());
export const removeBreadcrumb = createAction(BreadcrumbStoreActionType.REMOVE_BREADCRUMB, props<{ breadcrumb: BreadCrumb[] }>());
export const updateBreadcrumb = createAction(BreadcrumbStoreActionType.UPDATE_BREADCRUMB, props<{ breadcrumb: BreadCrumb[] }>());
export const clearBreadcrumb = createAction(BreadcrumbStoreActionType.CLEAR_BREADCRUMB);
export const loadBreadcrumb = createAction(BreadcrumbStoreActionType.LOAD_BREADCRUMB);

const initialize: BreadCrumb[] = [
  {
    label: 'Home',
    url: '/home'
  },
  {
    label: 'Perfil',
    url: '/profile/config'
  },
  {
    label: 'Meus Dados',
    url: 'profile/meus-dados'
  }
]

export const breadcrumbReducer = createReducer(
  initialize,
  on(addBreadcrumb,
    (state, { breadcrumb }) => {
      return breadcrumb;
    }
  ),
  on(removeBreadcrumb,
    (state, { breadcrumb }) => {
      return breadcrumb;
  }),
  on(updateBreadcrumb, (state, { breadcrumb }) => {
    return breadcrumb;
  }),
  on(clearBreadcrumb, (state) => {
    return state;
  }),
  on(loadBreadcrumb, (state) => {
    return state;
  }),
  on(loadBreadcrumb, (state) => {
    return state;
  })
);
