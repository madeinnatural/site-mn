import { ServerService } from './../../core/server/server.service';
import { ProductList } from 'src/app/core/model/Product';
import { Purchase } from './../../core/model/Product';
import { PurchaseService } from './../../core/global/purchase.service';
import { UserService } from './../../core/global/user.service';
import User  from 'src/app/core/model/User';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-summary',
  templateUrl: './purchase-summary.component.html',
  styleUrls: ['./purchase-summary.component.scss']
})
export class PurchaseSummaryComponent implements OnInit {

  user: User = {
    name: '',
    email: '',
    phone: '',
    cnpj: '',
    adresses: '',
    adresses_main: '',
    id: 0,
  };

  products: Array<ProductList> = [];
  total: number = 0;
  address = '';

  data: any

  constructor(
    public router: Router,
    private parent :ActivatedRoute,
    private userService: UserService,
    private purchaseService: PurchaseService,
    public server: ServerService,
  ) {

    this.data = parent.snapshot.queryParams
    this.server.getUserData().subscribe({
      next: (data: User) => {
        this.user = data;
      },
      error: (err: any) => {console.log('ALGO DE ERRADO NÃO ESTÁ CERTO ¬¬')}
    });
  }

  async ngOnInit() {


    console.log('Query Params', this.data);
    const id = (this.data as any).id


    if (id) {

      const { products } = await this.purchaseService.getPurchase(id)

      console.log('AQUI =>', products)

      products.forEach((product: ProductList) => {
          const subTotal = Math.abs(product.price) * Math.abs(product.quantity)
          this.total += subTotal;
      });

      this.products = products;

    }

  }

}
