import { CookieService } from '@ngx-toolkit/cookie';
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
  _finalPrice: number = 0;

  get finalPrice () {
    this._finalPrice = this.purchaseService.totalPrice()
    return this._finalPrice
  }

  set finalPrice (e) {
    this._finalPrice = e
  }

  get cartLength () {

    const cart_j = this.cookieService.getItem('cart')

    if (cart_j) {
      return JSON.parse(cart_j).length
    }

    return 0
  }

  constructor(
    private nav: Router,
    private accountService: AccountService,
    private globalEventService: GlobalEventService,
    private purchaseService: PurchaseService,
    private cookieService: CookieService
  ) {


   }

  ngOnInit(): void {

    this.finalPrice = this.totalPrice();

    // QUANDO NA ROTA DE LOGIN FECHAR MENU
    this.accountService.hidderHeaderFooter.subscribe((mostrar)=>{
      this.showHeader = !mostrar;
    })

    this.globalEventService.addItemCartEmit.subscribe(e => {

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

  goHome(){
    this.nav.navigate(['/']);
  }


}
