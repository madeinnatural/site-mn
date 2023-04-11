import { Category, FilterResponse, ListFilter } from './../../states-handler/store/filter.store';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Input, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { CelmarCategories, FilterClass, LoadedProductProperties, RmouraCategories, getFilters, setMainCategorie, setPackage, setPrice, setSubCategorie, setUnit } from '../../states-handler/store/filter.store';
import { Observable } from 'rxjs';

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

  currentfilter = {
    price:          {
      min: 0,
      max: 1000
    }
  }

  changeMainCategory (id: string) {
    console.log('CHANGE MAIN CATEGORY: ',id);
    this.store.dispatch(setMainCategorie( { props: id } ));
  }

  currentFilte$ = this.store.pipe<FilterClass>(select('currentFilter'));
  filterList$: Observable<FilterResponse>

  constructor(
    public dialogRef: MatDialogRef<AvancedFilterComponent>,
    private store: Store<any>,
    @Inject(MAT_DIALOG_DATA) public data: { data:  { filterList: Observable<FilterResponse> } }
  ){
    console.log('DATA: ', data);
    this.filterList$ = data.data.filterList;
  }

  calculationPrice ({ min, max }: { min: number, max: number }) {
    this.store.dispatch(setPrice({ min, max }));
  }

  onNoClick() { this.dialogRef.close(); }
}
