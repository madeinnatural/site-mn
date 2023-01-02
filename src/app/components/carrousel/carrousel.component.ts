import { Router } from '@angular/router';
import { GlobalEventService } from './../../core/services/global.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.scss']
})
export class CarrouselComponent implements OnInit {

  constructor(
    public nav: Router,
    public globalEventService: GlobalEventService
  ) { }

  ngOnInit(): void {
  }

  goSearch(){
    this.nav.navigate([this.globalEventService.URL_ROUTER_SEARCH]);
  }

  goCotacao(){
    this.nav.navigate([this.globalEventService.URL_ROUTER_COTACAO]);
  }

}
