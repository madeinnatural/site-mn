import { Subject, debounceTime } from 'rxjs';
import { GlobalEventService } from '../../../core/services/global.service';
import { Router } from '@angular/router';
import { Component, OnInit, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.scss']
})
export class SearchHeaderComponent {

  query: string = '';
  buscar_header = new EventEmitter<string>();

  @Input() type: 'mobile' | 'desktop' = 'desktop';

  private searchSubject: Subject<string> = new Subject<string>();

  constructor(
    public router: Router,
    public globalEvents: GlobalEventService,
  ) {
    this.searchSubject
      .pipe(debounceTime(500))
      .subscribe(query => {
        this.query = query;
        this.bucarProduto();
      });
  }

  monteQuery(event: KeyboardEvent){
    this.query = (event.target as HTMLInputElement).value;
    if (this.query.length >= 3 || event.key == 'Enter') {
      this.searchSubject.next(this.query);
    }
  }

  bucarProduto() {
    if (this.query == '')  this.query = " ";
    this.router.navigateByUrl('product_list?query=' + this.query);
    this.router.navigate(['product_list'], {queryParams: {query: this.query}});
    this.globalEvents.search.emit();
  }

}
