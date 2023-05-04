import {  Store } from '@ngrx/store';
import { Component } from '@angular/core';

import { ModalComponent } from './../../../components/modal/modal.component';
import { CartModel } from '../../../core/domain/model/logistics/cart';
import { PurchaseHistoryGroupedByYearMonth, getPurchaseHistory } from '../../../states-handler/store/pruchase.store';
import { ModalService } from '../../../core/services/modal.service';

@Component({
  selector: 'app-profile-requests',
  templateUrl: './profile-requests.component.html',
  styleUrls: ['./profile-requests.component.scss'],
})
export class ProfileRequestsComponent {

  purchaseHistory$ = this.store.select('purchasesHistory');
  constructor(
    private store: Store<{ purchasesHistory: PurchaseHistoryGroupedByYearMonth }>,
    private modalService: ModalService
  ) {
    this.store.dispatch(getPurchaseHistory());
  }

  tranformeNumber (value: string) {
    function transform(mes: number): string {
      const meses = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
      ];

      return meses[mes - 1];
    }
    return transform(Number(value) + 1);
  }

  async openDetail(carts: CartModel[]) {
    const modal = this.modalService.openModal(ModalComponent, { carts });
    modal.afterClosed().subscribe(result => { });
  }

}
