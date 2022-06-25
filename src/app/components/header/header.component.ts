import { Component, OnInit } from '@angular/core';
import { Navigation, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public nav: Router
  ) { }

  ngOnInit(): void {
  }

  goPageLogin() {
    this.nav.navigate(['login']);
  }

}
