import { CounterBarData } from './../../core/model/interfaces/Utils';
import { Router } from '@angular/router';
import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'resumo-compra',
  templateUrl: './resumo-compra.component.html',
  styleUrls: ['./resumo-compra.component.scss']
})
export class ResumoCompraComponent implements OnInit {

  @Input() dataBar: CounterBarData = {
    totalPrice: 0,
    quantity: 0,
  }

  constructor(
    public route: Router,
  ) { }

  goCart() {
    const url = '/cart';
    this.route.navigate([url]);
    window.scrollTo(0, 0);
  }

  changeDataCard(data: CounterBarData) {
    this.dataBar = data;
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
