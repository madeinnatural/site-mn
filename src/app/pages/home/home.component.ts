import { Component, OnInit } from '@angular/core';
import { CookieService } from '@ngx-toolkit/cookie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public listProduct: Array<{
    name: string;
    price: number;
    weigth: number;
    category: string;
    amount: number;
  }> = [];

  constructor(
    private cookies: CookieService,
  ) {
    cookies.setItem('auth_token', 'sdasasd')
  }


  ngOnInit(): void {}
}
