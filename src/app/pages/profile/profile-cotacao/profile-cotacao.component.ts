import { Quotation } from './../../../core/model/Product';
import { Router } from '@angular/router';
import User from 'src/app/core/model/User';
import { AccountService } from './../../../core/account/account.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-cotacao',
  templateUrl: './profile-cotacao.component.html',
  styleUrls: ['./profile-cotacao.component.scss']
})
export class ProfileCotacaoComponent {


  quotes: Quotation[] = [];

  status: 'badge-danger' | 'badge-warning' | 'badge-success' = 'badge-warning';

  constructor(
    private accountService: AccountService,
    private router: Router
  ) {
    this.pullCotacoes();
  }

  createCotacao() {
    this.router.navigate(['product_list']);
  }

  pullCotacoes() {
    this.accountService.getQuotes().subscribe((quotes: Quotation[]) => {
      this.quotes = quotes;
    });
  }

}
