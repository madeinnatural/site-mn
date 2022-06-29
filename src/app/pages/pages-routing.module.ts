import { AccountComponent } from './account/account.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { AuthQuard } from '../core/guards/auth.quard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: AccountComponent},
  {path: 'cart', canActivate: [AuthQuard] ,component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
