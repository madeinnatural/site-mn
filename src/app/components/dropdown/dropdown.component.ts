import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  @Input() type: 'menu_site' | 'menu_fechamendo' = 'menu_site';

  // CASO SEJA UM MENU DE FECHAMENTO
  @Input() cartLength: number = 0;
  @Input() finalPrice: number = 0;
  @Input() userPresent: boolean = false;
  @Input() goCart?: Function;
  @Input() goPageRegistration?: Function;
  @Input() currentPage: any;


  constructor(
    public nav: Router
  ) { }

  ngOnInit() {
  }

}
