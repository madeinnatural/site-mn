import { UserService } from './user.service';
import { UserRegister } from './../model/User';
import { CookieService } from '@ngx-toolkit/cookie';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalEventService {

   // Váriaveis comuns
   /**
    * Tempo máximo, em segundos, que o overlay de compra passa na tela.
    */
    overlayTime = 40; // 40s

    /**
     * Duração do intervalo, em milissegundos, entre requisições ao servidor
     * para receber o resultado de uma compra.
     */
    purchaseRequestInterval = 5000; // 5000ms

    readonly SAVED_STATE_COOKIE = "user_state";
    readonly SAVED_USER_COOKIE = "user";
    readonly AUTH_TOKEN_COOKIE = "auth_token";
    readonly CURRENT_USER_COOKIE = "current_user";

    // Eventos Públicos
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


    constructor(
      public http: HttpClient,
      public cookieService: CookieService,
      public userService: UserService
    ) { }

    async getAddressByIP() {
       try {
          let data = await this.http.get("https://api.ipify.org/?format=json").toPromise() as { ip: string };
          return await this.http.get(`https://ipapi.co/${data.ip}/json`).toPromise() as { city: string, region: string, region_code: string, country: string };
       } catch {
          return {
             city: "Natal",
             region: "Rio Grande do Norte",
             region_code: "RN",
             country: "Brazil"
          };
       }
    }

    URL_ROUTER_SEARCH = '/product_list';
    URL_ROUTER_COTACAO = 'profile/cotacao/create';

    finishPurchaseEmitter = new EventEmitter<number>();
    search = new EventEmitter<string>();



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
