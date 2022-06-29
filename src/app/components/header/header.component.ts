import { AccountService } from './../../core/account/account.service';
import { AccountComponent } from './../../pages/account/account.component';
import { LoginService } from './../../core/account/login.service';
import { Component, OnInit } from '@angular/core';
import { Navigation, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showHeader: boolean = true;

  constructor(
    private nav: Router,
    private accountService: AccountService,
  ) {

    // QUANDO NA ROTA DE LOGIN FECHAR MENU
    accountService.hidderHeaderFooter.subscribe((mostrar)=>{
      this.showHeader = !mostrar;
    })

   }

  ngOnInit(): void {
  }

  goPageLogin() {
    this.nav.navigate(['login']);
  }

  goCart() {
    this.nav.navigate(['cart']);
  }


}
