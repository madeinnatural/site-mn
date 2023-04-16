import { ServerService } from '../../core/services/server.service';
import { ProductList } from 'src/app/core/model/interfaces/Product';
import { PurchaseService } from './../../core/services/purchase.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-summary',
  templateUrl: './purchase-summary.component.html',
  styleUrls: ['./purchase-summary.component.scss']
})
export class PurchaseSummaryComponent {

  products: Array<ProductList> = [];
  total: number = 0;
  address = '';

  data: any

  constructor(
    public router: Router,
    public server: ServerService,
  ) {}
}
