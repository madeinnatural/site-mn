import User from 'src/app/core/model/User';
import { AccountService } from './../../../core/account/account.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-cotacao',
  templateUrl: './profile-cotacao.component.html',
  styleUrls: ['./profile-cotacao.component.scss']
})
export class ProfileCotacaoComponent implements OnInit {

  @Input() user?: User;

  constructor(
    private accountService: AccountService
  ) {}

  ngOnInit() {
  }

}
