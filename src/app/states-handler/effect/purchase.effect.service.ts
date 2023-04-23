import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { PurchaseHistoryGroupedByYearMonth, getPurchaseHistory, getPurchaseHistorySuccess, purchaseOrder, purchaseOrderFail, purchaseOrderSuccess } from "../store/pruchase.store";
import { map, switchMap, tap, catchError, of } from "rxjs";

import { CartModel, Order } from '../../core/domain/model/logistics/cart';
import { PurchaseModel } from '../../core/domain/model/financial/purchase';
import { ToastService } from '../../core/services/toast.service';
import { clearCart } from '../store/cart.store';

@Injectable({
  providedIn: 'root'
})
export class PurchaseEffectService {
  constructor(
    private toast   :ToastService,
    private http    :HttpClient,
    private store$  :Store<any>,
    private actions$:Actions,
    private router  :Router
  ) {
    this.store$.select('order').subscribe((order: Order[]) => this.order = order);
  }

  order: Order[] = [];
  purchase$ = createEffect(
    ()=> this.actions$.pipe(
      ofType(purchaseOrder),
      switchMap(() => this.http.post<CartModel>( 'create-cart', { order: this.order } )),
      tap(cart => this.http.post<PurchaseModel>( 'purchase', { cartId: cart.id } )),
      switchMap(cart => this.http.post<PurchaseModel>('purchase', { cartId: cart.id })),
      map(purchase => {
        this.toast.openSnackBar(
          'Recebemos o seu pedido com sucesso! Agora é só aguardar nosso time entrar em contato, se preferir ligue para a gente: (11) 95285-2681. Muito obrigado :)',
          'success-snackbar'
        );
        this.router.navigate([`profile/pedidos`], { queryParams: {id: purchase.id}});
        return purchaseOrderSuccess({ payload: purchase })
      })
    )
  );

  purchaseHistory$ = createEffect(
    () => this.actions$.pipe(
      ofType(getPurchaseHistory),
      switchMap(() => this.http.get<{ history: PurchaseHistoryGroupedByYearMonth }>('/purchase/history')),
      map(purchaseHistory => {
        this.store$.dispatch(clearCart());
        return getPurchaseHistorySuccess({ payload: {...purchaseHistory.history } })
      }),
      catchError(err => {
      this.toast.openSnackBar(
        'Ocorreu um erro ao buscar o histórico de compras, tente novamente mais tarde.',
        'error-snackbar'
        );
        return of(purchaseOrderFail({ payload: err }))
      }),
    )
  );
}
