import { AccountService } from './../../core/account/account.service';
import { AccountComponent } from './../../pages/account/account.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  showHeader: boolean = true;

  constructor(
    private accountService: AccountService,
  ) {
     // QUANDO NA ROTA DE LOGIN FECHAR MENU
    accountService.hidderHeaderFooter.subscribe((mostrar)=>{
      this.showHeader = !mostrar;
    })
  }

  ngOnInit() {
  }

}
