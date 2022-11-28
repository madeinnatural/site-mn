import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-PageNotFoundComponent',
  templateUrl: './PageNotFoundComponent.component.html',
  styleUrls: ['./PageNotFoundComponent.component.scss']
})
export class PageNotFoundComponentComponent implements OnInit {

  codeError: number = 404;

  constructor() { }

  ngOnInit() {
  }

}
