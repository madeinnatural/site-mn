import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, debounceTime } from 'rxjs';
import { setText } from '../../products-cart/imports';

@Component({
  selector: 'app-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.scss']
})
export class SearchHeaderComponent {
  @Input() type: 'mobile' | 'desktop' = 'desktop';

  public query: string = '';
  private searchSubject: Subject<string> = new Subject<string>();
  constructor(
    public router: Router,
    private store: Store<any>
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
    this.store.dispatch(setText({props: this.query}))
    this.router.navigate(['product_list']);
  }

}
