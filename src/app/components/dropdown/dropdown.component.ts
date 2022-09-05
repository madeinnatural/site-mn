import { Router } from '@angular/router';
import { Component, OnInit, Input, ViewChild } from '@angular/core';

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

  @ViewChild('dropdown_closing', {static: true}) dropdown_closing: HTMLButtonElement;


  constructor(
    public nav: Router
  ) {
    const drop = document.querySelector('#dropdown_closing')
    this.dropdown_closing = drop as HTMLButtonElement;
  }

  openDropdown() {
    this.dropdown_closing.click();
  }

  ngOnInit() {
  }

}
