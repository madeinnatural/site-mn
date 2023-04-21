import { Cotacao, Purchase, PurchaseHistory, AvancedFilter, DataSearch } from '../model/interfaces/Product';
import { GlobalEventService } from '../services/global.service';
import { CookieService } from '@ngx-toolkit/cookie';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { ToastService } from '../../core/services/toast.service';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { catchError, from, map, Observable, of, switchMap } from 'rxjs';
import { ProductList } from '../model/interfaces/Product';
import { HttpErrorResponse } from '../domain/model/http/http.model';


@Injectable({providedIn: 'root'})
export class ServerService {

  constructor(
    private cookies :CookieService,
    private global  :GlobalEventService,
    private router :Router,
    public http    :HttpClient,
    public toast   :ToastService
  ) {}

  post<T>(url: string, data: any, options?: any): Observable< HttpEvent<T> | null> {
    return this.http.post<T>(url, data, options).pipe(
      catchError((error: HttpErrorResponse) => {
        this.toast.openSnackBar(error.error.error, 'error-snackbar');
        return of(null);
      })
    )
  }

  async updatePassword (password: string) {
    return this.talkToServer('users/update_password', {password}, {type: 'PUT'});
  }

  async recoveryPassword(email: string) {
    return await this.talkToServer('users/recovery_password', {email}, {type: 'POST'});
  }

  getUserData(): Observable<any> {return from( this.talkToServer('users/get_data_user'))}
  async verifyToken(token: string) {return this.talkToServer('token/verify', {token})}
  async getPurchase(id: number) {return await this.talkToServer('purchase/detail', {id})}

  async createCotacao(products: Cotacao[]) {
    return this.talkToServer('cotacao/create', {products}, {type: 'POST'});
  }

  finishPurchase(products: Array<ProductList>): Promise<Purchase> {
    return this.talkToServer('purchase/register', {shopping_cart: products}, {type: 'POST'});
  }

  search(data: AvancedFilter, numberPage?: number) {
    let url = `seach?query=${data.termo}`;
    if (numberPage) url += '&page=' + numberPage
    const filterPrice = data.price;
    const filterCategory = data.category;

    if (filterPrice) url += '&price=' + filterPrice;
    if (filterCategory) url += '&category=' + filterCategory;
    return this.http.get<DataSearch>(environment.baseUrl + url);
  }

  purchaseHistory (){
    const get_token = this.getToken()
    const token = get_token ? get_token : ''
    return this.http.get<PurchaseHistory[]>(environment.baseUrl + 'purchase/purchase_history',{headers: { Authorization: token}});
  }

  getProductListHome(page: number) {
    return this.http.get<ProductList[]>(environment.baseUrl, {params: {page}});
  }

  getProductListQuery(query: string, current_page?: number): Observable<DataSearch> {
    let url = `seach?query=${query}` + '&page=' + current_page;
    return this.http.get<DataSearch>( environment.baseUrl + url).pipe(map(e => {
      e.data = e.data.filter(e => e.name != 'produto');
      return e;
    }));
  }

  async login(params: any) {

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

  async updateUser(user:any) {

  }

  async getProductFilter(params = {}) {
    return this.talkToServer('seach/filter', params);
  }

  async updateAddress (address: any) {
    return this.talkToServer('users/update_address', {address}, {type: 'PUT'});
  }

}
