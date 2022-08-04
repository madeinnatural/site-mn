import { Router } from '@angular/router';
import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.scss']
})
export class SearchHeaderComponent implements OnInit {

  query: string = '';
  buscar_header = new EventEmitter<string>();

  constructor(
    public router: Router
  ) { }

  ngOnInit() {}

  monteQuery(event: {target: any}){
    this.query = event.target.value;
  }

  bucarProduto() {
   this.router.navigate(['profile/pedidos'], {queryParams: {query: this.query}})
  }

}
