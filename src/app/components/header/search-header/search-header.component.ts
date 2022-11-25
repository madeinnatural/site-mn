import { GlobalEventService } from '../../../core/global/global.service';
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
    public router: Router,
    public globalEvents: GlobalEventService,
  ) { }

  ngOnInit() {}

  monteQuery(event: KeyboardEvent){
    if (this.query.length > 3 || event.key == 'Enter') {
      setTimeout(() => {
        this.bucarProduto();
      },1000);
    }
  }

  bucarProduto() {
    if (this.query == '')  this.query = " ";
    this.router.navigateByUrl('product_list?query=' + this.query);
    this.router.navigate(['product_list'], {queryParams: {query: this.query}});
    this.globalEvents.search.emit();
  }

}
