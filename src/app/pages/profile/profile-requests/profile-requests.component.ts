import {  Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ModalComponent } from './../../../components/modal/modal.component';
import { CartModel } from '../../../core/domain/model/logistics/cart';
import { PurchaseHistoryGroupedByYearMonth, getPurchaseHistory } from '../../../states-handler/store/pruchase.store';
import { ModalService } from 'src/app/core/services/modal.service';

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





// <div *ngFor="let month of year ">



                // <div class="card-body p-0">
                //     <table class="table mb-0">
                //       <thead>
                //         <tr>
                //           <th scope="col" class="col_table">Data</th>
                //           <th scope="col" class="col_table">Quantidade</th>
                //           <th scope="col" class="col_table response_format" colspan="2">Valor final</th>
                //           <th scope="col" class="col_table_final hidder"></th>
                //         </tr>
                //       </thead>
                //       <tbody>
                //         <tr *ngFor="let day of getDays(year, month, purchaseHistory); let i = index">
                //           <td class="row_table" scope="row"> {{ purchaseHistory[year][month][day][i].cart.createdAt | date:'dd/MM HH:mm':'America/Sao_Paulo'}}</td>
                //           <td class="row_table" scope="row"> {{ purchaseHistory[year][month][day][i].cart.cartItem.length }}</td>
                //           <td class="row_table response_format" scope="row">
                //             <strong>{{ 0 | currency:'BRL':true:'1.2-2' }}</strong>
                //             <button class="show btn btn_detial">
                //               Detalhes
                //             </button>
                //           </td>
                //           <td class="row_table hidder " scope="row">
                //             <button class="btn btn_detial">
                //               Detalhes
                //             </button>
                //           </td>
                //         </tr>
                //       </tbody>
                //     </table>




//                   <!-- <div *ngIf="!dataHistory.length">
//             <div class="text-center">
//               <img src="assets/img/computador.webp" style="max-width: 100px;" alt="Carrinho vazio" class="img-fluid">
//             </div>
//             <h3 class="text-center mt-3">Você ainda não realizou nenhuma compra</h3>
//             <div class="text-center mt-3">
//               <button class="btn btn_green text-uppercase text-light" (click)="goToProductList()">Ir para a loja</button>
//             </div>
//           </div> -->

//                 </div>
//                 <div class="card-footer text-right bg-transparent">
//                   <mn-button class="btn text-uppercase " (click)="goToProductList()">Repetir pedido</mn-button>
//                 </div>
//               </div>
//             </div>
