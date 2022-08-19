import { Item, PurchaseHistory } from './../model/Product';
import { GlobalEventService } from './../global/global.service';
import { CookieService } from '@ngx-toolkit/cookie';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { delay, Observable, tap } from 'rxjs';
import { ProductList } from '../model/Product';
import User, { UserLogin } from '../model/User';

@Injectable({
  providedIn: 'root',
})
export class ServerService {

  private shouldReportErrors = true;

  constructor(
    private cookies: CookieService,
    private global: GlobalEventService,
    private router: Router,
    private http: HttpClient,
    ) {}

    finishPurchase(products: Array<any>){
      return this.talkToServer('purchase/register', {shopping_cart: products}, {type: 'POST'});
    }

    async search(termo: string, numberPage?: number) {

      let url = `seach?query=${termo}`;

      if (numberPage) url += '&page=' + numberPage

      return this.talkToServer(url);
    }

    purchaseHistory (){
      const get_token = this.getToken()
      const token = get_token ? get_token : ''
      return this.http.get<PurchaseHistory[]>(environment.apiUrl + 'purchase/purchase_history',{headers: { Authorization: token}});
    }

    getProductListHome(page: number) {
      return this.http.get<ProductList[]>(environment.apiUrl, {params: {page}});
    }

    getProductListQuery(query: string, current_page: number) {
      return this.http.get<ProductList[]>( environment.baseUrl + 'products/get_products_query', {params:  {query, current_page}})
      .pipe(
      delay(2000),
       tap(console.log)
      )
    }

    async login(params: UserLogin) {
      return this.http.post<string>('token', { email: params.email, password: params.password });
    }

    public getToken(): string | null {
      return this.cookies.getItem(this.global.AUTH_TOKEN_COOKIE);
    }

    private async talkToServer(
      method: string,
      params: any = {},
      options: {
        type?: 'GET' | 'POST' | 'PUT' | 'DELETE';
        endPoint?: string;
      } = {}
    ): Promise<any> {
      //Set defaults

      if (!options.type) options.type = 'GET';

      let methodUrl: string;
      if (options.endPoint) {
        methodUrl = environment.baseUrl + options.endPoint;
      } else {
        methodUrl = environment.apiUrl;
      }
      methodUrl += method;

      const token = this.getToken();
      let httpOptions: any;

      if (token) {
        httpOptions = {
          headers: new HttpHeaders({
            Authorization: token,
            AppVersion: '9999.99.99',
          }),
        };
      } else {
        httpOptions = {
          headers: new HttpHeaders({
            AppVersion: '9999.99.99',
          }),
        };
      }
      httpOptions.observe = 'response';

      if (options.type == 'GET' || options.type == 'DELETE') {
        let paramKeys = Object.keys(params);

        if (paramKeys.length) {
          methodUrl += '?';
          paramKeys.forEach((key) => {
            if (Array.isArray(params[key])) {
              let a = params[key];
              key = key + '[]';
              a.forEach((item: string) => {
                methodUrl += key + '=' + item + '&';
              });
            } else {
              methodUrl += key + '=' + params[key] + '&';
            }
          });
          methodUrl = methodUrl.substr(0, methodUrl.length - 1);
        }
      }

      let obs: Observable<any>;
      switch (options.type) {
        case 'GET':
          obs = this.http.get(methodUrl, httpOptions);
          break;
        case 'DELETE':
          obs = this.http.delete(methodUrl, httpOptions);
          break;
        case 'PUT':
          obs = this.http.put(methodUrl, params, httpOptions);
          break;
        case 'POST':
          obs = this.http.post(methodUrl, params, httpOptions);
          break;
      }

      return await new Promise((resolve, reject) => {
        obs.subscribe(
          (response) => {
            this.shouldReportErrors =
              response.headers.get('Allow-Error-Report') == 'true';
            resolve(response.body);
          },
          (error) => {
            if (
              error.status == 401 &&
              this.cookies.getItem(this.global.AUTH_TOKEN_COOKIE)
            ) {
              this.cookies.removeItem(this.global.AUTH_TOKEN_COOKIE);
              this.cookies.removeItem(this.global.SAVED_USER_COOKIE);

              this.global.logoutEvent.emit();
              this.router.navigate(['/conta']);
            }
            reject(error);
          }
        );
      });
    }
}
