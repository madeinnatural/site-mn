import { ProductService } from './../global/product.service';
import { Cotacao, Purchase, PurchaseHistory, AvancedFilter } from './../model/Product';
import { GlobalEventService } from './../global/global.service';
import { CookieService } from '@ngx-toolkit/cookie';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, map, Observable } from 'rxjs';
import { ProductList } from '../model/Product';
import User, { UserLogin } from '../model/User';

@Injectable({providedIn: 'root'})
export class ServerService {

  private shouldReportErrors = true;

  constructor(
    private cookies: CookieService,
    private global: GlobalEventService,
    private productService: ProductService,
    private router: Router,
    public http: HttpClient,
  ) {}

    async verifyToken(token: string) {return this.talkToServer('token/verify', {token})}
    async getPurchase(id: number) {return await this.talkToServer('purchase/detail', {id})}

    async createCotacao(products: Cotacao[]) {
      return this.talkToServer('cotacao/create', {products}, {type: 'POST'});
    }

    async finishPurchase(products: Array<ProductList>): Promise<Purchase> {
      return this.talkToServer('purchase/register', {shopping_cart: products}, {type: 'POST'});
    }

    async search(termo: string, filter?: AvancedFilter, numberPage?: number) {
      let url = `seach?query=${termo}`;
      if (numberPage) url += '&page=' + numberPage
      if (filter) url += '&category=' + filter.category + '&price=' + filter.price
      return this.talkToServer(url);
    }

    purchaseHistory (){
      const get_token = this.getToken()
      const token = get_token ? get_token : ''
      return this.http.get<PurchaseHistory[]>(environment.baseUrl + 'purchase/purchase_history',{headers: { Authorization: token}});
    }

    getProductListHome(page: number) {
      return this.http.get<ProductList[]>(environment.baseUrl, {params: {page}});
    }

    getProductListQuery(query: string, current_page?: number) {
      let url = `seach?query=${query}`;
      if (current_page) url += '&page=' + current_page
      return this.http.get<ProductList[]>( environment.baseUrl + url).pipe(
        map((products) => {

          const products_vericy = this.productService.veryfy_product_in_cart(products);

          return products_vericy;
        })
      )
    }

    async login(params: UserLogin) {
      return this.http.post<string>('token', { email: params.email, password: params.password });
    }

    public getToken(): string | null {
      const token = this.cookies.getItem(this.global.AUTH_TOKEN_COOKIE);
      console.log('token', token)
      if (token) return token;
      return null;
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
        methodUrl = environment.baseUrl;
      }
      methodUrl += method;

      const token = this.getToken();
      console.log('TOKEN GETTOKEN', token);
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
            this.shouldReportErrors = response.headers.get('Allow-Error-Report') == 'true';
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

    async getCategorias() {
      return await this.talkToServer('seach/get_categories');
    }

    async updateUser(user: User) {
      return this.talkToServer('users/', user, {type: 'PUT'});
    }

    async getProductFilter(params = {}) {
      return this.talkToServer('seach/filter', params);
    }
}
