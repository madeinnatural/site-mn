import { LoginService } from './core/account/login.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  showFooterHeader = false;

  constructor(
    private authService: LoginService,
  ) {
    this.authService.hidderHeaderFooter.subscribe((mostrar)=>{
      this.showFooterHeader = mostrar;
    })
  }

}
