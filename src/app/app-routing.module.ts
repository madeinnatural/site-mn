import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CookieModule } from '@ngx-toolkit/cookie';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadChildren: () => import('./pages/pages.module').then( m => m.PagesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CookieModule.forRoot()],
  exports: [RouterModule]
})
export class AppRoutingModule { }
