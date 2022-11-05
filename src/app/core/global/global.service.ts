import { UserService } from './user.service';
import { UserRegister } from './../model/User';
import { CookieService } from '@ngx-toolkit/cookie';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalEventService {

  readonly SAVED_STATE_COOKIE = "user_state";
  readonly SAVED_USER_COOKIE = "user";
  readonly AUTH_TOKEN_COOKIE = "auth_token";
  readonly CURRENT_USER_COOKIE = "current_user";
  readonly URL_ROUTER_SEARCH = '/product_list';
  readonly URL_ROUTER_COTACAO = 'profile/cotacao/create';

  disableHeaderEvent = new EventEmitter<boolean>();
  triggerLogout = new EventEmitter();
  logoutEvent = new EventEmitter();
  goAlert = new EventEmitter<{type: 'danger' | 'success' | 'warning', text: string, duration?: number}>();
  loading = new EventEmitter<boolean>();
  loginEvent = new EventEmitter<any>();
  loadingOverlay = new EventEmitter<number>();
  overlayTimeout = new EventEmitter();
  stateChanged = new EventEmitter<string>();
  showFooter = new EventEmitter<boolean>();
  mainClean = new EventEmitter<boolean>();
  showModal = new EventEmitter<boolean>();
  eventWithoutCompany = new EventEmitter<any>();
  rEvento = new EventEmitter<any>();
  pullProductList = new EventEmitter<string>();
  errorPurchase = new EventEmitter<{ showError: boolean, text: string }>();
  errorLogin = new EventEmitter<{ showError: boolean, text: string }>();
  addItemCartEmit = new EventEmitter<'removel:cart' | 'add:cart' | 'init:cart'>();
  finishPurchaseEmitter = new EventEmitter<number>();
  search = new EventEmitter<string>();

  constructor(
    public http: HttpClient,
    public cookieService: CookieService,
    public userService: UserService
  ) { }

  setDataUser(res: { user: UserRegister; auth_token: string }) {
    const {user, auth_token} = res;
    const localAuthToken = this.AUTH_TOKEN_COOKIE;
    const localCurrentUser = this.CURRENT_USER_COOKIE;
    const current_user = JSON.stringify(user);

    this.cookieService.setItem(localCurrentUser, current_user);
    this.cookieService.setItem(localAuthToken, auth_token);


    window.localStorage.setItem(localCurrentUser,current_user);

    this.loginEvent.emit(user);
  }
}
