import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { CartModel } from 'src/app/core/domain/model/logistics/cart';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
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


