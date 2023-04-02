import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CelmarProductFilter, RmouraProductFilter, SpecificationProductsLoaded } from '../model/interfaces/specification-products-loaded';
import { ProductModel } from '../domain/model/product/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductSaleServiceService {
  private splRmoura: SpecificationProductsLoaded<RmouraProductFilter> = {
    filter: {
      unitId: "",
      categoryId: "",
      packageId: "",
      price: {
        min: 0,
        max: 2000
      }
    },
    paginator: {
      page: 0,
      limit: 10
    },
    text: ""
  };

  private splCelmar: SpecificationProductsLoaded<CelmarProductFilter> = {
    filter: {
      mainCategoryId: "",
      subCategoryId: "",
      packageId: "",
      price: {
        min: 0,
        max: 2000
      }
    },
    paginator: {
      page: 0,
      limit: 10
    },
    text: ""
  };

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private readonly http: HttpClient) {}

  private requestProductsSale(provider: 'rmoura' | 'celmar', spl: any): Observable<ProductModel[]> {
    return this.http.post<ProductModel[]>(`${environment.baseUrl}pull-products-${provider}`, spl, this.httpOptions);
  }

  getProductsSale(provider: 'rmoura' | 'celmar'): Observable<ProductModel[]> {
    const currentSpl = window.localStorage.getItem('spl');
    let spl;

    if (provider === 'celmar') {
      spl = currentSpl ? JSON.parse(currentSpl) : this.splCelmar;
    }

    if (provider === 'rmoura') {
      spl = currentSpl ? JSON.parse(currentSpl) : this.splRmoura;
    }

    if (!spl) {
      throw new Error('Provider not found');
    }

    return this.requestProductsSale(provider, spl);
  }
}
