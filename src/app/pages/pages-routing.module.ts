import { PurchaseSummaryComponent } from './purchase-summary/purchase-summary.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
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
  {path: 'profile', canActivate: [AuthQuard],
    children: [
      { path: 'pedidos',canActivate: [AuthQuard], component: ProfileRequestsComponent},
      { path: 'profile_data',canActivate: [AuthQuard], component: ProfileDataComponent},
      { path: 'cotacao',canActivate: [AuthQuard], component: ProfileCotacaoComponent }
    ]
  },
  {path: 'product_detail', component: ProductDetailComponent},
  {path: 'product_list', component: ProductListComponent},
  {path: 'purchase_summary', component: PurchaseSummaryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
