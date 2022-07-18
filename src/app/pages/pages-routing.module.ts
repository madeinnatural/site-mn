import { LoginComponent } from './account/login/login.component';
import { ProfileRequestsComponent } from './profile/profile-requests/profile-requests.component';
import { ProfileCotacaoComponent } from './profile/profile-cotacao/profile-cotacao.component';
import { ProfileDataComponent } from './profile/profile-data/profile-data.component';
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
  {path: 'profile/profile_data', canActivate: [AuthQuard], component: ProfileDataComponent},
  {path: 'profile/profile_data/pedidos',canActivate: [AuthQuard], component: ProfileRequestsComponent},
  {path: 'profile/profile_data/cotacao',canActivate: [AuthQuard], component: ProfileCotacaoComponent},
  {path: 'exit',canActivate: [AuthQuard], component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
