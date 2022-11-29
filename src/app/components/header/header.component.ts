import { ProductService } from './../../core/global/product.service';
import { UserService } from './../../core/global/user.service';
import User from 'src/app/core/model/interfaces/User';
import { CookieService } from '@ngx-toolkit/cookie';
import { PurchaseService } from './../../core/global/purchase.service';
import { GlobalEventService } from './../../core/global/global.service';
import { AccountService } from './../../core/account/account.service';
import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  user: User;

  user_name?: string = '';

  query: string = '';

  showHeader: boolean = true;
  _finalPrice: number = 0;



  change_query(event: any) {
    if (event.target.value) this.query = event.target.value;
  }

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

  constructor(
    private nav: Router,
    private accountService: AccountService,
    private globalEventService: GlobalEventService,
    private purchaseService: PurchaseService,
    private cookieService: CookieService,
    public userService: UserService,
    private productService: ProductService
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

  goPageRegistration () {
    const extra: NavigationExtras = {
      queryParams: {type: 'registration'},
    };

    this.nav.navigate(['registration'], extra);
  }

  goHome(){
    this.nav.navigate(['/']);
  }

  active: boolean = true

  closeMenu () {
    this.active = !this.active
  }

  goCart() {
    this.nav.navigate(['cart']);
  }

  goProfile() {
    this.nav.navigate(['/profile/profile_data']);
  }

}


