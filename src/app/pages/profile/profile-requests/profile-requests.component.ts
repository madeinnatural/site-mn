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

  purchases?: PurchaseHistory[];

  constructor(
    private router: Router,
    private purchaseService: PurchaseService
    ) {

      purchaseService.historyPurchase().then( purchases => {
        this.purchases = purchases

        console.log(this.purchases)
      })



    }

  ngOnInit() {}

  gotoRouter(url:string){
    this.router.navigateByUrl(url)
  }

}
