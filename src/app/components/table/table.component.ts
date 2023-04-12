import { Observable } from 'rxjs';
import { ProductsDisplay } from './../../core/model/interfaces/Product';
import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { Category, setCurrentLimit } from 'src/app/states-handler/store/filter.store';
import { Showcase } from 'src/app/states-handler/store/product-showcase.store';

@Component({
  selector: 'mn-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit {

  @Input() showcases?: Observable<Showcase[]>;

  ngOnInit() {
    this.innerWidth = window.innerWidth;
  }

  formatCategory(category: Category[]) {
    return category.map((cat: Category) => cat.name).join(' | ')
  }

  changeTypeCharge(product: ProductsDisplay) {
    this.addItem(product);
  }

  removeItem(data: ProductsDisplay) {

  }

  addItem(data: ProductsDisplay) {

  }

  addCart(id: string) {
    console.log('ID do produto:', id)
  }

  constructor(
    private store: Store<any>
  ) { }

  showProductsAll() {
    this.store.dispatch(setCurrentLimit({ limit: 9000 }));
  }

  changePrice(productD: ProductsDisplay) {

  }

  productValid(product: ProductsDisplay) {

  }

  innerWidth: number = 0;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }

}



// <ng-container *ngIf="innerWidth < 980">
//   <thead>
//     <tr class="bg-white">
//       <th scope="col">Produto</th>
//     </tr>
//   </thead>
//   <tbody>
//     <tr *ngFor="let product of products; index as i">
//       <ng-container *ngIf="productValid(product)">
//         <td scope="row" class="row-table">

//           <div class="row-table">
//             <div class="row-table-titles">
//               {{ product.product.name }}
//             </div>
//             <div class="row-table-body">
//               <!-- <span *ngIf="product.subTotal">Valor parcial: {{ product.subTotal | currency: 'BRL' }}</span> -->
//             </div>
//           </div>

//           <div scope="row" class="row-table">
//             <span class="row-table-category">
//               <!-- {{ product.product.product_categories.main }} -->
//             </span>
//           </div>

//           <!-- <div scope="row" class="row-table"> {{ changePrice(product) | currency: 'BRL' }}</div> -->

//           <div class="control-mobile">

//             <!-- <card-choose *ngIf="product.active && product.quantityInCart == 0" [product]="product" (itemAdd)="changeTypeCharge($event)" ></card-choose> -->

//             <!-- <button-init-cart *ngIf="product.quantityInCart == 0 && !product.active" size="default" (click)="product.active = true"></button-init-cart> -->

//             <!-- <button-quantity *ngIf="product.typeCharge && product.quantityInCart > 0" [quantity]="product.quantityInCart" [item]="product" (itemAdd)="addItem($event)" (itemRm)="removeItem($event)" ></button-quantity> -->

//           </div>

//         </td>


//       </ng-container>
//   </tbody>
// </ng-container>
