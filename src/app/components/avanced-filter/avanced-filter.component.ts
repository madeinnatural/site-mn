import { FilterResponse, setPackage, setSubCategorie } from './../../states-handler/store/filter.store';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Input, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { FilterClass, setMainCategorie, setPrice } from '../../states-handler/store/filter.store';
import { Observable } from 'rxjs';

interface o {currentFilter: FilterClass, filterList: FilterResponse}

@Component({
  selector: 'app-avanced-filter',
  templateUrl: './avanced-filter.component.html',
  styleUrls: ['./avanced-filter.component.scss']
})
export class AvancedFilterComponent {

  changeMainCategory (id: string) {
    this.store.dispatch(setMainCategorie( { props: id } ));
  }
  changeSubCategory (id: string) {
    this.store.dispatch(setSubCategorie( { props: id } ));
  }
  changeUnit (id: string) {
    this.store.dispatch(setPackage( { props: id } ));
  }

  currentFilte$ = this.store.pipe<FilterClass>(select('currentFilter'));
  provider$ = this.store.pipe<string>(select('provider'));
  filterList$: Observable<FilterResponse>

  constructor(
    public dialogRef: MatDialogRef<AvancedFilterComponent>,
    private store: Store<any>,
    @Inject(MAT_DIALOG_DATA) public DataDialog: {
      data:  { filterList: Observable<FilterResponse> }
    }
  ){
    this.filterList$ = DataDialog.data.filterList;
  }

  calculationPrice ({ min, max }: { min: number, max: number }) {
    this.store.dispatch(setPrice({ min, max }));
  }

  onNoClick() { this.dialogRef.close(); }
}
