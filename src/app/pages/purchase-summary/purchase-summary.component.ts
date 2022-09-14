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

  constructor(
    private router: Router,
    private parent :ActivatedRoute,
    private userService: UserService,
    private purchaseService: PurchaseService
  ) {

    this.user = this.userService.getCurrentUserLocalStorage()
    const data = this.router.getCurrentNavigation()?.extractedUrl.queryParams;
    const { id } = data as any;

    if (id) {
      this.purchaseService.getPurchase(id).then(purchaseDetail => {
        const {products} = purchaseDetail;
          products.forEach((product: ProductList) => {
            const subTotal = Math.abs(product.price) * Math.abs(product.amount)
            this.total += subTotal;
          });
        this.products = products;
      });
    }

  }

  ngOnInit() {
  }

}
