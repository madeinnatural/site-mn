import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { purchaseOrder, purchaseOrderSuccess, setPurchases } from "../store/pruchase.store";
import { map, switchMap, tap } from "rxjs";
import { CartModel, Order } from 'src/app/core/domain/model/logistics/cart';
import { PurchaseModel } from 'src/app/core/domain/model/financial/purchase';
import { loadCartSuccess, updateCart } from '../store/cart.store';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ToastComponent } from 'src/app/components/toast/toast.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PurchaseEffectService {
  constructor(
    private snackBar:MatSnackBar,
    private http    :HttpClient,
    private store$  :Store<any>,
    private actions$:Actions,
    private router  :Router
  ) {
    this.store$.select('order').subscribe((order: Order[]) => this.order = order);
  }

  openSnackBar(msg: string, panel = 'error-snackbar') {
    const config = new MatSnackBarConfig();
    config.duration = 5 * 1000,
    config.panelClass = [panel]
    config.horizontalPosition = 'end';
    config.verticalPosition = 'bottom';
    config.data = msg;
    this.snackBar.openFromComponent(ToastComponent, config);
  }

  order: Order[] = [];
  purchase$ = createEffect(
    ()=> this.actions$.pipe(
      ofType(purchaseOrder),
      switchMap(() => this.http.post<CartModel>( 'create-cart', { order: this.order } )),
      tap(cart => this.http.post<PurchaseModel>( 'purchase', { cartId: cart.id } )),
      switchMap(cart => this.http.post<PurchaseModel>('purchase', { cartId: cart.id })),
      map(purchase => {
        this.openSnackBar('Recebemos o seu pedido com sucesso! Agora é só aguardar nosso time entrar em contato, se preferir ligue para a gente: (11) 95285-2681. Muito obrigado :)');
        this.router.navigate([`profile/pedidos`], { queryParams: {id: purchase.id}});
        return purchaseOrderSuccess({ payload: purchase })
      })
    )
  );
}
