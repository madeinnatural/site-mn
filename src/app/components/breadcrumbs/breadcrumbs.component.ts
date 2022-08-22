import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  @Input() breadcrumbs: any[] = [{name: 'Home', url: '/'},{name: 'Minha conta', url: 'profile/profile_data'}];

  elementStyle (lastItem: boolean): string {
    return lastItem ? 'color: #000; padding-left: 5px; text-decoration: none;' : 'text-decoration: none; color: #686868; padding-right: 5px; text-decoration: none;'
  }

  constructor() { }

  ngOnInit(): void {
  }

}
