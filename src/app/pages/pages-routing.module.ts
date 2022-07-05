import { DashboardProfileComponent } from './profile/dashboard-profile/dashboard-profile.component'
import { AccountComponent } from './account/account.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { AuthQuard } from '../core/guards/auth.quard';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: AccountComponent},
  {path: 'cart', canActivate: [AuthQuard] ,component: CartComponent},
  {path: 'profile', canActivate: [AuthQuard], component: ProfileComponent,
    children:[
      {path: 'dashboard', canActivate: [AuthQuard], component: DashboardProfileComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
