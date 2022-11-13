import { Component, OnInit } from '@angular/core';
import { CookieService } from '@ngx-toolkit/cookie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  data_card = {
    total: 0,
    quantidade: 0,
  }

  changeDataCard(data: any) {
    console.log(data)
    this.data_card = data;
  }

  constructor() {}

  ngOnInit(): void {}
}
