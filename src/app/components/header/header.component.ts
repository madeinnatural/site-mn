import { PurchaseService } from './../../core/global/purchase.service';
import { GlobalEventService } from './../../core/global/global.service';
import { AccountService } from './../../core/account/account.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showHeader: boolean = true;
  finalPrice: number = 0;
  cartLength: number = 0;

  constructor(
    private nav: Router,
    private accountService: AccountService,
    private globalEventService: GlobalEventService,
    private purchaseService: PurchaseService,
  ) {


   }

  ngOnInit(): void {

    this.cartLength = this.getLengthPurhase();

    this.finalPrice = this.totalPrice();

    // QUANDO NA ROTA DE LOGIN FECHAR MENU
    this.accountService.hidderHeaderFooter.subscribe((mostrar)=>{
      this.showHeader = !mostrar;
    })

    this.globalEventService.addItemCartEmit.subscribe(e => {

      this.cartLength = this.getLengthPurhase();

      this.finalPrice = this.totalPrice()
    });

  }

  totalPrice(){
    return this.purchaseService.totalPrice();
  }

  getLengthPurhase() {
    return this.purchaseService.itemCount();
  }

  goPageLogin() {
    this.nav.navigate(['login']);
  }

  goCart() {
    this.nav.navigate(['cart']);
  }


}
