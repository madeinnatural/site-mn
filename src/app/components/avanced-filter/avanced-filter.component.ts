import { Category, ListFilter, getOptionsFilter } from './../../states-handler/store/filter.store';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { CelmarCategories, FilterClass, LoadedProductProperties, RmouraCategories, getFilters, setMainCategorie, setPackage, setPrice, setSubCategorie, setUnit } from '../../states-handler/store/filter.store';
import { map } from 'rxjs';

interface ContentStore {
  currentFilter: ListFilter,
  productSieve:  LoadedProductProperties,
  filter:        FilterClass,
  provider:      'RMOURA' | 'CELMAR',
  getOptionsFilter: Category[]
}

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
  };
  rmouraCategories: RmouraCategories = {
    filterResponse: {
      categories: [],
      units:      [],
      packages:   [],
    }
  }

  filter: FilterClass = {
    mainCategoryId: '',
    subCategoryId:  '',
    unitId:         '',
    packageId:      '',
    price:          {
      min: 0,
      max: 1000
    }
  }

  private _maincategory = '';
  set mainCategoryId (props: string) {
    this.store.dispatch(setMainCategorie({props}));
  }

  private _subCategory = '';
  set subCategoryId (props: string) {
    this.store.dispatch(setSubCategorie({props}));
  }

  private _unitId = '';
  set unitId (props: string) {
    this.store.dispatch(setUnit({props}));
  }

  private _packageId = '';
  set packageId (props: string) {
    this.store.dispatch(setPackage({props}));
  }

  get mainCategoryId () {
    return this._maincategory
  }

  get subCategoryId () {
    return this._subCategory
  }

  get unitId () {
    return this._unitId
  }

  get packageId () {
    return this._packageId
  }

  optionsCelmarMainCategerie$ = this.store.pipe(select('getOptionsFilter'))

  productSieve$ = this.store.pipe(select('productSieve'))
  provider$     = this.store.pipe(select('provider'))
  filters$      = this.store.pipe(select('currentFilter')).pipe(map((data) => data.filterResponse));
  filter$       = this.store.pipe(select('filter'))

  constructor(
    public dialogRef: MatDialogRef<AvancedFilterComponent>,
    private store: Store<ContentStore>,
  ){
    this.store.dispatch(getFilters())
  }

  calculationPrice ({ min, max }: { min: number, max: number }) {
    this.store.dispatch(setPrice({ min, max }));
  }

  onNoClick() { this.dialogRef.close(); }
}
