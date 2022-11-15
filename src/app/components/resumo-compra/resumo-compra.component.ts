import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-resumo-compra',
  templateUrl: './resumo-compra.component.html',
  styleUrls: ['./resumo-compra.component.scss']
})
export class ResumoCompraComponent implements OnInit {

  @Input() data_card = {
    total: 0,
    quantidade: 0,
  }

  constructor() { }

  changeDataCard(data: any) {
    this.data_card = data;
  }

  public innerWidth: any;
  ngOnInit() {
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }

}