import { CartService } from './../../core/services/cart.service';
import { UserService } from './../../core/services/user.service';
import User from 'src/app/core/model/interfaces/User';
import { CookieService } from '@ngx-toolkit/cookie';
import { PurchaseService } from './../../core/services/purchase.service';
import { GlobalEventService } from './../../core/services/global.service';
import { AccountService } from './../../core/account/account.service';
import { Component, Input, OnInit, Inject, Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  faCoffee = faCoffee;
  active: boolean = true
  openMenu: boolean = false;
  showHeader: boolean = true;
  _finalPrice: number = 0;
  query: string = '';
  user_name?: string = '';
  user: User;

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

  get userPresent () {
    return this.accountService.current_user;
  }

  get username() {
    return this.accountService.current_user.name;
  }

  purchaseValue: number =  0;

  constructor(
    private nav: Router,
    private accountService: AccountService,
    private globalEventService: GlobalEventService,
    private purchaseService: PurchaseService,
    private cookieService: CookieService,
    public userService: UserService,
    public cartService: CartService,
  ) {

    const current_user  = this.accountService.current_user;



    this.user = current_user;

    if (current_user){
      const [user_name] = this.user.name.slice(0, 14).split(' ')
      this.user_name = user_name
    }

    this.globalEventService.logoutEvent.subscribe(()=> {
      this.user = {
        adresses: {
          cep: '',
          city: '',
          street: '',
          number: '',
          state: ''
        },
        adresses_main: '',
        cnpj: '',
        email: '',
        id: 0,
        name: '',
        phone: ''
      }
    });

    this.globalEventService.loginEvent.subscribe((user)=> {

      this.user = user;
      const [user_name] = this.user.name.slice(0, 14).split(' ')
      this.user_name = user_name

    });

  }

  goPageLogin() {
    this.nav.navigate(['login']);
  }

  goPageRegistration () {
    const extra: NavigationExtras = {queryParams: {type: 'registration'} };
    this.nav.navigate(['registration'], extra);
  }

  change_query(event: any) {if (event.target.value) this.query = event.target.value;}
  goHome(){this.nav.navigate(['/'])}
  closeMenu () {this.active = !this.active}
  goCart() {this.nav.navigate(['cart']);}
  goProfile() {this.nav.navigate(['/profile/profile_data'])}

}


