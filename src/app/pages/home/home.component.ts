import { CartService } from './../../core/services/cart.service';
import { AvancedFilter } from './../../core/model/interfaces/Product';
import { GlobalEventService } from 'src/app/core/services/global.service';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { ServerService } from 'src/app/core/services/server.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent {

  constructor(
    public aRouter: ActivatedRoute,
    public global: GlobalEventService,
    public server: ServerService,
    public cartService: CartService,
  ) {}

  search(data: AvancedFilter) {
  }
}
