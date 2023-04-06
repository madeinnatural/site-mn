import { MatDialogRef } from '@angular/material/dialog';
import { Component, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { CelmarCategories, LoadedProductProperties, RmouraCategories, changeProvider, setMainCategorie, setPackage, setPrice, setSubCategorie, setUnit } from '../../states-handler/store/filter.store';
import { map } from 'rxjs';

@Component({
  selector: 'app-avanced-filter',
  templateUrl: './avanced-filter.component.html',
  styleUrls: ['./avanced-filter.component.scss']
})
export class AvancedFilterComponent {

  @Input() type: 'RMOURA' | 'CELMAR' = 'RMOURA';
  celmarCategories: CelmarCategories = {
    filterResponse: {
      mainCategory: [],
      subCategory:  [],
      packages:     [],
    }
  };
  rmouraCategories: RmouraCategories = {
    filterResponse: {
      units: [],
      categories: [],
      packages: [],
    }
  }

  filter = {
    mainCategory: '',
    subCategory:  '',
    unit:         '',
    package:      '',
    price:        {
      min: 0,
      max: 1000
    }
  }

  set mainCategoryId (params: string) {
    this.productListingProperties.dispatch(setMainCategorie(params));
  }

  set subCategoryId (params: string) {
    this.productListingProperties.dispatch(setSubCategorie(params));
  }

  set unitId (params: string) {
    this.productListingProperties.dispatch(setUnit(params));
  }

  set packageId (params: string) {
    this.productListingProperties.dispatch(setPackage(params));
  }

  get mainCategoryId () {
    return this.filter.mainCategory
  }

  get subCategoryId () {
    return this.filter.subCategory
  }

  get unitId () {
    return this.filter.unit
  }

  get packageId () {
    return this.filter.package
  }

  productSieve$ = this.productListingProperties.pipe(select('productSieve')).pipe(map((data) => data.filter));
  provider$ = this.provider.pipe(select('provider'));
  constructor(
    public dialogRef: MatDialogRef<AvancedFilterComponent>,
    private productListingProperties: Store<{productSieve: LoadedProductProperties}>,
    private provider: Store<{ provider: 'RMOURA' | 'CELMAR' }>
    ){
    this.productSieve$.subscribe((data) => {
      this.filter = {
        mainCategory: data.mainCategoryId,
        subCategory:  data.subCategoryId,
        unit:         data.unitId,
        package:      data.packageId,
        price:        data.price
      }
    });
    this.provider$.subscribe((data) => this.type = data )
  }

  calculationPrice ({ min, max }: { min: number, max: number }) {
    this.productListingProperties.dispatch(setPrice({ min, max }));
  }

  onNoClick() { this.dialogRef.close(); }
}
