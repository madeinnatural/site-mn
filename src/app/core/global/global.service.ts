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

    // Eventos Públicos
    public disableHeaderEvent = new EventEmitter<boolean>();
    public triggerLogout = new EventEmitter();
    public logoutEvent = new EventEmitter();
    public goAlert = new EventEmitter<{type: 'danger' | 'success' | 'warning', text: string, duration?: number}>();
    public loading = new EventEmitter<boolean>();
    public loadingOverlay = new EventEmitter<number>();
    public overlayTimeout = new EventEmitter();
    public stateChanged = new EventEmitter<string>();
    public showFooter = new EventEmitter<boolean>();
    public mainClean = new EventEmitter<boolean>();
    public showModal = new EventEmitter<boolean>();
    public eventWithoutCompany = new EventEmitter<any>();
    public publicarEvento = new EventEmitter<any>();


    addItemCartEmit = new EventEmitter<'removel:cart' | 'add:cart' | 'init:cart'>();


    public errorPurchase = new EventEmitter<{ showError: boolean, text: string }>();

    constructor(private http: HttpClient) { }

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
}
