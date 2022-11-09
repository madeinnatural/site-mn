import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent {

  arrayPages: Array<number> = [0];

  @Input() hidderPagination: boolean = false;
  @Input() current_page = 0;
  @Input() moreProduct = true;

  @Output() page = new EventEmitter<number>();

  constructor() {
    if (this.moreProduct) {
      this.arrayPages.push(1);
    }
  }

  nextPage() {
    this.current_page += 1;
    if(this.moreProduct) this.arrayPages.push(this.arrayPages.length);
    this.page.emit(this.current_page);
  }

  previewPage() {
    if( this.current_page >= 1 ) {
      this.current_page -= 1;
      this.page.emit(this.current_page);
    }
  }

  changePage(page: number) {
    if (this.moreProduct) this.arrayPages.push(this.arrayPages.length);
    this.current_page = page;
    this.page.emit(page);
  }

}
