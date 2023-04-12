import { switchMap, tap, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from '@ngrx/store';
import { CartModel } from 'src/app/core/domain/model/logistics/cart';
import { loadCart, loadCartSuccess, updateCart } from '../store/cart.store';

@Injectable({
  providedIn: 'root'
})
export class CartEffectsService {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<any>
  ){}

  loadCartEffect = this.actions$.pipe(
    ofType(loadCart),
    switchMap(() => this.http.get<CartModel[]>('http://localhost:3000/cart')),
    tap((cart: CartModel[]) =>this.store.dispatch(updateCart({ cart }))),
    map((cart: CartModel[]) => this.store.dispatch(loadCartSuccess()))
  );
}
