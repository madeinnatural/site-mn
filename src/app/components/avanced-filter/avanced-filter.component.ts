import { ServerService } from './../../core/server/server.service';
import { DialogData } from './../modal/modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-avanced-filter',
  templateUrl: './avanced-filter.component.html',
  styleUrls: ['./avanced-filter.component.scss']
})
export class AvancedFilterComponent implements OnInit {

  // unidades: Array<string> = [
  //   'Todas',
  //   '1 kg',
  //   '5 kg',
  //   '10 kg',
  //   '15 kg',
  //   '20 kg',
  //   '25 kg',
  //   'Unidade',
  //   'Caixa',
  // ]

  categories: Array<{title: string, id: number}> = [];

  constructor(
    public dialogRef: MatDialogRef<AvancedFilterComponent>,
    private server: ServerService,
    @Inject(MAT_DIALOG_DATA) public data: {price: number, category: string, filter_unidade: string},
  ){ this.server.getCategorias().then((categorias: Array<string>) => {
      categorias.forEach((categoria, index) => {
        this.categories.push({title: categoria, id: index});
      });
    });
  }

  formatLabel(value: number) {return value;}

  onNoClick() { this.dialogRef.close(); }

  ngOnInit() {}

}
