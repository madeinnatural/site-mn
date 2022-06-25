import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-cart',
  templateUrl: './products-cart.component.html',
  styleUrls: ['./products-cart.component.scss']
})
export class ProductsCartComponent implements OnInit {

  @Input('listProduct') listProduct: Array<{
    name: string;
    price: number;
    weigth: number;
    category: string;
    amount: number;
  }> = [];

  constructor() {
    this.listProduct = [
      {
        name: 'Açúcar Mascavo Orgânico',
        price: 2.5,
        weigth: 1.0,
        category: 'Categoria 1',
        amount: 0,
      },
      {
        name: 'Açúcar Mascavo Orgânico',
        price: 2.5,
        weigth: 1.0,
        category: 'Categoria 1',
        amount: 0,
      },
    ];
  }

  showProductsAll() {
    const productsListServer = [
      {
        name: 'Sabonete',
        price: 3.5,
        weigth: 1.0,
        category: 'Categoria 1',
        amount: 0,
      },
      {
        name: 'Perfeuma',
        price: 4.5,
        weigth: 1.0,
        category: 'Categoria 1',
        amount: 0,
      },
    ];

    this.listProduct.push(...productsListServer);
  }


  ngOnInit(): void {
  }

}
