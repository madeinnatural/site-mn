import { Observable, map, switchMap, of } from 'rxjs';
import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BreadCrumb, addBreadcrumb, loadBreadcrumb } from '../store/breadcrumb.store';
import { CookieService } from '@ngx-toolkit/cookie';

export class BreadcrumbEffectService {
  constructor(
    private action$: Actions,
    private store: Store,
    private cookie: CookieService,
  ) {}

  breadcrumbEffect$ = createEffect(() => {
    return this.action$.pipe(
      ofType(loadBreadcrumb),
      switchMap(() => {
        const cookie = this.cookie.getItem('breadcrumb');
        if (cookie) {
          const breadcrumb: BreadCrumb[] = JSON.parse(cookie);
          return of(breadcrumb);
        }
        return of([{
          label: 'Home',
          url: '/home'
        }]);
      }),
      map((action) => {
        return addBreadcrumb({ breadcrumb: action });
      })
    );
  })
}
