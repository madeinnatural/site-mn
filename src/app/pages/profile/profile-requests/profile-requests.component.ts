import { PurchaseHistory } from './../../../core/model/interfaces/Product';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ModalComponent } from './../../../components/modal/modal.component';
import { ProductList } from '../../../core/model/interfaces/Product';

@Component({
  selector: 'app-profile-requests',
  templateUrl: './profile-requests.component.html',
  styleUrls: ['./profile-requests.component.scss']
})
export class ProfileRequestsComponent {

  purchaseHistory$ = this.store.select('purchasesHistory');
  constructor(
    private router: Router,
    private store: Store<{ purchasesHistory: PurchaseHistory[]}>,
    public dialog: MatDialog,
  ) {}

  gotoRouter(url:string){
    this.router.navigateByUrl(url)
  }

  async openDetail(product?: ProductList[]) {

    const dialogRef = this.dialog.open(ModalComponent , {
      width: '100%',
      data: { product: product }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  goToProductList() {
    this.router.navigateByUrl('/product_list?query=%20%20');
  }

}

export class Modal {
  product: ProductList[] = [];
}





























































// <app-header></app-header>
// <!--=========== minha conta ===========-->
// <section class="w-100 section_minha_conta mb-5">
//   <div class="container">
//     <div class="row">
//       <div class="col-12 mb-3">
//         <div style="color: #686868;">
//           Home <i class="fa fa-angle-right"></i>
//           Informações de Compra <i class="fa fa-angle-right"></i>
//           <strong style="color: #000;"> Histórico de compras</strong>
//         </div>
//       </div>
//       <div class="col-12">
//         <div class="pt-3 pl-3 mr-4"
//           style="position: relative; background-image: url('assets/img/circles.png'); background-size: 72px 72px; background-repeat: no-repeat;">
//           <h3 class="bg-white pt-2 px-3"><strong>Histórico de compras</strong></h3>
//         </div>
//       </div>
//     </div>
//     <div class="row mt-3">
//       <div class="col-md-1"></div>

//       <app-menu-profile class="col-12 col-md-4 col-lg-3 mb-4"></app-menu-profile>

//       <div class="col-12 col-md-6 col-lg-7">
//         <div class="w-100 compra" *ngIf="purchaseHistory$ | async as dataHistory else loading">

//             <ng-container style="display: none;" *ngFor="let purchasesByMont of dataHistory">
//               <h5 class="mb-3"><strong>{{purchasesByMont.month}} {{purchaseYear.year}}</strong></h5>
//               <div class="card mb-5" style="border-radius: 0;">
//                 <div class="card-header d-block d-lg-flex justify-content-between align-items-center">
//                   <div class="mb-3 mb-lg-0">
//                     <div>Vendido e entrege por</div>
//                     <h3 class="_color_green mb-0" style="font-weight: 700;">NATURAL</h3>
//                   </div>
//                   <div class="d-flex align-items-center">
//                     <i class="fa fa-exclamation-circle mr-2"></i>
//                     <h2 class="mb-0">
//                       {{purchasesByMont.final_price | currency:'BRL':true:'1.2-2' }}
//                       <i class="fa fa-angle-right ml-2"></i>
//                     </h2>
//                   </div>
//                 </div>

//                 <div class="card-body p-0">
//                   <table class="table mb-0">
//                     <thead>
//                       <tr>
//                         <th scope="col" class="col_table">Data</th>
//                         <th scope="col" class="col_table">Quantidade</th>
//                         <th scope="col" class="col_table response_format" colspan="2" >Valor final</th>
//                         <th scope="col" class="col_table_final hidder"></th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr  *ngFor="let purchase of purchasesByMont.purchases">
//                         <td class="row_table" scope="row"> {{ purchase.created_at | date: 'dd/MM/yyyy hh:mm:ss'}}</td>
//                         <td class="row_table" scope="row"> {{ purchase.products?.length }}</td>
//                         <td class="row_table response_format" scope="row">
//                           <strong>{{ purchase.final_price | currency:'BRL':true:'1.2-2' }}</strong>
//                           <button class="show btn btn_detial" (click)="openDetail(purchase.products)">
//                             Detalhes
//                           </button>
//                         </td>
//                         <td class="row_table hidder " scope="row">
//                           <button class="btn btn_detial"  (click)="openDetail(purchase.products)">
//                             Detalhes
//                           </button>
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//                 <div class="card-footer text-right bg-transparent">
//                   <mn-button class="btn text-uppercase "(click)="goToProductList()">Repetir pedido</mn-button>
//                 </div>
//               </div>
//             </ng-container>


//           <div *ngIf="!dataHistory.length">
//             <div class="text-center">
//               <img src="assets/img/computador.webp" style="max-width: 100px;" alt="Carrinho vazio" class="img-fluid">
//             </div>
//             <h3 class="text-center mt-3">Você ainda não realizou nenhuma compra</h3>
//             <div class="text-center mt-3">
//               <button class="btn btn_green text-uppercase text-light" (click)="goToProductList()">Ir para a loja</button>
//             </div>
//           </div>

//         </div>
//         <ng-template #loading>
//           <div class="row">
//             <div class="col-12">
//               <div class="d-flex justify-content-center align-items-center" style="height: 100vh;">
//                 <div>
//                   <app-loading></app-loading>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </ng-template>
//       </div>
//     </div>
//   </div>
// </section>
// <!--=========== fim minha conta ===========-->
