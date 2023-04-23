import { RecoveryFormComponent } from './account/password-recovery/recovery-form/recovery-form.component';
import { PasswordRecoveryComponent } from './account/password-recovery/password-recovery.component';
import { PurchaseSummaryComponent } from './purchase-summary/purchase-summary.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProfileRequestsComponent } from './profile/profile-requests/profile-requests.component';
import { ProfileCotacaoComponent } from './profile/profile-cotacao/profile-cotacao.component';
import { ProfileDataComponent } from './profile/profile-data/profile-data.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { AuthQuard } from '../core/guards/auth.quard';
import { PageNotFoundComponentComponent } from './page-not-found/PageNotFoundComponent.component';
import { LoginComponent } from './account/login/login.component';
import { SignupComponent } from './account/register/signup.component';
import { SendPasswordRecoverySuccessComponent } from './account/password-recovery/send-password-recovery-success/send-password-recovery-success.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent, data: { title : 'Home' }},
  {path: 'account', data: { title : 'Account' },
    children: [
      {path: 'login',  component: LoginComponent, data: { title : 'Login' } },
      {path: 'signup', component: SignupComponent, data: { title : 'Signup' } },
    ]
  },
  {path: 'cart',   canActivate: [AuthQuard], component: CartComponent, data: { title : 'Finalizar Compra' }},
  {path: 'profile', canActivate: [AuthQuard], data: { title : 'Profile' },
    children: [
      {path: 'config',  canActivate: [AuthQuard], component: ProfileDataComponent, data: { title : 'Configurações' } },
      {path: 'pedidos', canActivate: [AuthQuard], component: ProfileRequestsComponent, data: { title : 'Pedidos' }},
      {path: 'cotacao', canActivate: [AuthQuard], component: ProfileCotacaoComponent, data: { title : 'Cotação' } },
      {path:'**', redirectTo: 'config'}
    ],
  },
  {path: 'product_detail', component: ProductDetailComponent, data: { title : 'Product Detail' }},
  {path: 'product_list', component: ProductListComponent, data: { title : 'Product List' }},
  {path: 'purchase_summary', component: PurchaseSummaryComponent, data: { title : 'Purchase Summary' }},
  {path: 'password-recovery', component: PasswordRecoveryComponent, data: { title : 'Password Recovery' },
    children: [
      { path: 'success', component: SendPasswordRecoverySuccessComponent, data: { title : 'Password Recovery Success' } },
    ]
  },
  {path: 'password-recovery/page/:id', component: RecoveryFormComponent, data: { title : 'Password Recovery Form' }},
  {path: 'page-not-found', component: PageNotFoundComponentComponent, data: { title : 'Page Not Found' }},
  {path: '**', redirectTo: 'page-not-found'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
