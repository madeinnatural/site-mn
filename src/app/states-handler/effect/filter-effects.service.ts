import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs';
import { FilterClass, ListFilter, getFilters, setFilters, successLoadFilter } from '../store/filter.store';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class FilterEffectsService {

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<{filter: FilterClass}>
  ) { }

  loadFilter = createEffect(
    () => this.actions$.pipe(
      ofType(getFilters),
      switchMap(() => this.http.get<ListFilter>('get-product-filter')),
      tap((filter: ListFilter) => this.store.dispatch<any>(setFilters({props: filter}))),
      map((filter: ListFilter) => successLoadFilter({props: filter}))
    )
  )
}
