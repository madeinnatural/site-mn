import { Router } from '@angular/router';
import User from 'src/app/core/model/interfaces/User';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-cart-header',
  templateUrl: './cart-header.component.html',
  styleUrls: ['./cart-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartHeaderComponent implements OnInit {

  @Input() user?: User;
  @Input() cartLength: any
  @Input() finalPrice: any
  @Input() goPageRegistration: any



  constructor(
    public nav: Router,
  ) { }

  ngOnInit(): void {
  }

  goCart() {
    this.nav.navigate(['cart']);
  }

  goProfile() {
    this.nav.navigate(['/profile/profile_data']);
  }

}
