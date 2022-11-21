import { ModalComponent } from './../../../components/modal/modal.component';
import { ProductList } from 'src/app/core/model/Product';
import { Observable, map } from 'rxjs';
import { PurchaseHistory } from './../../../core/model/Product';
import { PurchaseService } from './../../../core/global/purchase.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-requests',
  templateUrl: './profile-requests.component.html',
  styleUrls: ['./profile-requests.component.scss']
})
export class ProfileRequestsComponent implements OnInit {

  purchaseHistory$:  Observable<PurchaseHistory[]>;
  dataProductDetail?: ProductList[];
  displayStyle = "none";

  constructor(
    private router: Router,
    public purchaseService: PurchaseService,
    private modal: NgbModal,
    public dialog: MatDialog,
  ) {
    this.purchaseHistory$ = purchaseService.historyPurchase();
  }

  ngOnInit() {}

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
