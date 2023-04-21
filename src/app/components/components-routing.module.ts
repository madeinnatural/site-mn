import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasswordRecoveryComponent } from '../pages/account/password-recovery/password-recovery.component';
import { SendPasswordRecoverySuccessComponent } from '../pages/account/password-recovery/send-password-recovery-success/send-password-recovery-success.component';

const routes: Routes = [
  {
    path: 'password-recovery',
    component: PasswordRecoveryComponent,
    children: [
      { path: 'success', component: SendPasswordRecoverySuccessComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentsRoutingModule { }
