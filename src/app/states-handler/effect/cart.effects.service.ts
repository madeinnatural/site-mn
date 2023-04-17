import { switchMap, tap, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from '@ngrx/store';
import { CartModel } from '../../core/domain/model/logistics/cart';
import { loadCart, loadCartSuccess, updateCart } from '../store/cart.store';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ToastComponent } from 'src/app/components/toast/toast.component';

@Injectable({
  providedIn: 'root'
})
export class CartEffectsService {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<any>,
  ){}

  loadCartEffect = this.actions$.pipe(
    ofType(loadCart),
    switchMap(() => this.http.get<CartModel>('cart')),
    tap((cart: CartModel) => this.store.dispatch(updateCart({ cart }))),
    map((cart: CartModel) => this.store.dispatch(loadCartSuccess()  ))
  );
}
