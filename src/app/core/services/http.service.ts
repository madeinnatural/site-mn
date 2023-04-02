import { Product } from './../model/interfaces/Product';
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

  getProductListEditaveis(): Observable<{ rmoura: Product[], celmar: Product[] }> {
    const rmoura = this.http.get<Product[]>(`${baseUrl}/api/pull-products-rmoura`);
    const celmar = this.http.get<Product[]>(`${baseUrl}/api/pull-products-celmar`);
    return new Observable(observer => {
      rmoura.subscribe({
        next: (data: Product[]) => {
          observer.next({ rmoura: data, celmar: [] });
        },
        error: (err: any) => {console.log('ALGO DE ERRADO NÃO ESTÁ CERTO ¬¬')}
      });
      celmar.subscribe({
        next: (data: Product[]) => {
          observer.next({ rmoura: [], celmar: data });
        },
        error: (err: any) => {console.log('ALGO DE ERRADO NÃO ESTÁ CERTO ¬¬')}
      });
    });
  }

}
