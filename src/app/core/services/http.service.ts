import { ProductResponse } from './../model/interfaces/Product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getProductListEditaveis(): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(baseUrl);
  }

}
