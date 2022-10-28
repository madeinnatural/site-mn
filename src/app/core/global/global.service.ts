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
    public overlayTime = 40; // 40s

    /**
     * Duração do intervalo, em milissegundos, entre requisições ao servidor
     * para receber o resultado de uma compra.
     */
    public purchaseRequestInterval = 5000; // 5000ms

    public readonly SAVED_STATE_COOKIE = "user_state";
    public readonly SAVED_USER_COOKIE = "user";
    public readonly AUTH_TOKEN_COOKIE = "auth_token";
    public readonly CURRENT_USER_COOKIE = "current_user";

    // Eventos Públicos
    public disableHeaderEvent = new EventEmitter<boolean>();
    public triggerLogout = new EventEmitter();
    public logoutEvent = new EventEmitter();
    public goAlert = new EventEmitter<{type: 'danger' | 'success' | 'warning', text: string, duration?: number}>();
    public loading = new EventEmitter<boolean>();
    public loginEvent = new EventEmitter<any>();
    public loadingOverlay = new EventEmitter<number>();
    public overlayTimeout = new EventEmitter();
    public stateChanged = new EventEmitter<string>();
    public showFooter = new EventEmitter<boolean>();
    public mainClean = new EventEmitter<boolean>();
    public showModal = new EventEmitter<boolean>();
    public eventWithoutCompany = new EventEmitter<any>();
    public publicarEvento = new EventEmitter<any>();

    public pullProductList = new EventEmitter<string>();


    addItemCartEmit = new EventEmitter<'removel:cart' | 'add:cart' | 'init:cart'>();


    public errorPurchase = new EventEmitter<{ showError: boolean, text: string }>();
    public errorLogin = new EventEmitter<{ showError: boolean, text: string }>();


    constructor(
      private http: HttpClient,
      private cookieService: CookieService
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
