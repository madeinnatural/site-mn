import { Observable } from 'rxjs';
import { Purchase, PurchaseHistory } from './../../../core/model/Product';
import { PurchaseService } from './../../../core/global/purchase.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-requests',
  templateUrl: './profile-requests.component.html',
  styleUrls: ['./profile-requests.component.scss']
})
export class ProfileRequestsComponent implements OnInit {

  purchases$:  Observable<PurchaseHistory[]>;

  constructor(
    private router: Router,
    private purchaseService: PurchaseService
    ) {
      this.purchases$ = purchaseService.historyPurchase()
    }

  ngOnInit() {}

  gotoRouter(url:string){
    this.router.navigateByUrl(url)
  }

}
