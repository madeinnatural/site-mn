import { Router } from '@angular/router';
import User from 'src/app/core/model/interfaces/User';
import { AccountService } from './../../../core/account/account.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-cotacao',
  templateUrl: './profile-cotacao.component.html',
  styleUrls: ['./profile-cotacao.component.scss']
})
export class ProfileCotacaoComponent implements OnInit {

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  createCotacao() {
    this.router.navigate(['product_list']);
  }

  ngOnInit() {

  }

}
