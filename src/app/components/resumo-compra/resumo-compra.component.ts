import { CounterBarData } from './../../core/model/interfaces/Utils';
import { Router } from '@angular/router';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartModel } from 'src/app/core/domain/model/logistics/cart';

@Component({
  selector: 'resumo-compra',
  templateUrl: './resumo-compra.component.html',
  styleUrls: ['./resumo-compra.component.scss']
})
export class ResumoCompraComponent implements OnInit {

  dataBar: CounterBarData = {
    totalPrice: 0,
    quantity: 0,
  }

  constructor(
    public route: Router,
    private store: Store<{cart: CartModel}>
  ) {
    this.store.select('cart').subscribe((cart: CartModel) => {
      this.dataBar = {
        totalPrice: cart.total,
        quantity: cart.orders.reduce((acc, order) => acc + order.quantity, 0),
      }
    })
  }

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
