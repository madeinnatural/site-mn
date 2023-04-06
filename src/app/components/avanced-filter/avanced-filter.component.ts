import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { CelmarCategories, FilterClass, LoadedProductProperties, setMainCategorie } from 'src/app/states-handler/store/filter.store';
import { Pagination } from 'src/app/core/model/interfaces/specification-products-loaded';
import { Observable, map } from 'rxjs';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-avanced-filter',
  templateUrl: './avanced-filter.component.html',
  styleUrls: ['./avanced-filter.component.scss']
})
export class AvancedFilterComponent {

  @Input() type: 'RMOURA' | 'CELMAR' = 'CELMAR';
  celmarCategories: CelmarCategories = {
    filterResponse: {
      mainCategory: [],
      subCategory:  [],
      packages:     [],
    }
  }

  currentMainCategory: string = '1';
  currentSubCategory: string = '1';
  currentPackage: string = '1';
  currentPrice: { min: number, max: number } = { min: 0, max: 2000 };
  currentUnit: string = '1';

  set price (params: { min: number, max: number }) {
    this.productListingProperties.dispatch({
      type: 'SET_PRICE',
      props: {
        price: params
      }
    });
  }

  set mainCategoryId (params: string) {
    this.productListingProperties.dispatch(setMainCategorie(params));
  }

  set subCategoryId (params: string) {
    this.productListingProperties.dispatch({
      type: 'SET_SUB_CATEGORY',
      props: {
        subCategoryId: params
      }
    });
  }

  set unitId (params: string) {
    this.productListingProperties.dispatch({
      type: 'SET_UNIT',
      props: {
        unitId: params
      }
    });
  }

  set packageId (params: string) {
    this.productListingProperties.dispatch({
      type: 'SET_PACKAGE',
      props: {
        packageId: params
      }
    });
  }

  set paginator (params: Pagination) {
    this.productListingProperties.dispatch({
      type: 'SET_PAGE',
      props: {
        paginator: params
      }
    });
  }

  get mainCategoryId () {
    return this.currentMainCategory
  }

  get subCategoryId () {
    return this.currentMainCategory
  }

  get unitId () {
    return this.currentUnit
  }

  get packageId () {
    return this.currentPackage
  }

  set text (params: string) {
    this.productListingProperties.dispatch({
      type: 'SET_TEXT',
      props: {
        text: params
      }
    });
  }

  productSieve$ = this.productListingProperties.pipe(select('productSieve')).pipe(map((data) => data.filter));
  constructor(
    public dialogRef: MatDialogRef<AvancedFilterComponent>,
    private productListingProperties: Store<{productSieve: LoadedProductProperties}>,
    @Inject(MAT_DIALOG_DATA) public data: {price: number, category: string, filter_unidade: string},
  ){
    this.productSieve$.subscribe((data) => {
      this.currentMainCategory = data.mainCategoryId;
      this.currentSubCategory = data.subCategoryId;
      this.currentPackage = data.packageId;
      this.currentPrice = data.price;
      this.currentUnit = data.unitId;
    })
  }

  formatLabel(value: number) {
    console.log(value)
    return value;
  }
  onNoClick() { this.dialogRef.close(); }

}
