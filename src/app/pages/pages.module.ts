
import { DashboardProfileComponent } from './profile/dashboard-profile/dashboard-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    HomeComponent,
    AccountComponent,
    AccountComponent,
    CartComponent,
    ProfileComponent,
    DashboardProfileComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  exports: [
    CartComponent,
  ]
})
export class PagesModule { }
