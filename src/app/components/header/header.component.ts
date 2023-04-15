import { CartService } from './../../core/services/cart.service';
import { UserService } from './../../core/services/user.service';
import User from 'src/app/core/model/interfaces/User';
import { CookieService } from '@ngx-toolkit/cookie';
import { PurchaseService } from './../../core/services/purchase.service';
import { GlobalEventService } from './../../core/services/global.service';
import { AccountService } from './../../core/account/account.service';
import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Store, select } from '@ngrx/store';
import { CartModel } from 'src/app/core/domain/model/logistics/cart';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  faCoffee = faCoffee;
  active: boolean = true
  openMenu: boolean = false;
  query: string = '';

  totalItems :number = 0;
  valueCart  :number = 0;
  constructor(
    private nav: Router,
    private store :Store<{cart: CartModel}>
  ) {
    this.store.pipe(select('cart')).subscribe(cart => {
      this.totalItems = cart.orders.length;
      this.valueCart = cart.total
    });
  }

  goPageLogin() {
    this.nav.navigate(['login']);
  }

  goPageRegistration () {
    const extra: NavigationExtras = { queryParams: {type: 'registration'} };
    this.nav.navigate(['registration'], extra);
  }

  change_query(event: any) {if (event.target.value) this.query = event.target.value;}
  goHome(){this.nav.navigate(['/'])}
  closeMenu () {this.active = !this.active}
  goCart() {this.nav.navigate(['cart']);}
  goProfile() {this.nav.navigate(['/profile/profile_data'])}

}


