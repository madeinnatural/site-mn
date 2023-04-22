import { RecoveryFormComponent } from './account/password-recovery/recovery-form/recovery-form.component';
import { PasswordRecoveryComponent } from './account/password-recovery/password-recovery.component';
import { ServerService } from '../core/services/server.service';
import { PurchaseService } from './../core/services/purchase.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PurchaseSummaryComponent } from './purchase-summary/purchase-summary.component';
import { ProductListComponent } from './product-list/product-list.component';
import { LoginComponent } from './account/login/login.component';
import { ProfileCotacaoComponent } from './profile/profile-cotacao/profile-cotacao.component';
import { ProfileRequestsComponent } from './profile/profile-requests/profile-requests.component';
import { ProfileDataComponent } from './profile/profile-data/profile-data.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { PageNotFoundComponentComponent } from './page-not-found/PageNotFoundComponent.component';
import { SignupComponent } from './account/register/signup.component';
import { SendPasswordRecoverySuccessComponent } from './account/password-recovery/send-password-recovery-success/send-password-recovery-success.component';
import { ProfileBodyComponent } from '../components/profile/body/body.component';
import { BodyComponent } from '../components/table/body/body.component';


@NgModule({
  declarations: [
    HomeComponent,
    CartComponent,
    ProfileComponent,
    ProfileDataComponent,
    ProfileRequestsComponent,
    ProfileCotacaoComponent,
    LoginComponent,
    SignupComponent,
    ProductListComponent,
    PurchaseSummaryComponent,
    PasswordRecoveryComponent,
    RecoveryFormComponent,
    PageNotFoundComponentComponent,
    SendPasswordRecoverySuccessComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
  ],
  exports: [
    HomeComponent,
    CartComponent,
    ProfileComponent,
    ProfileDataComponent,
    ProfileRequestsComponent,
    ProfileCotacaoComponent,
    LoginComponent,
    SignupComponent,
    ProductListComponent,
    PurchaseSummaryComponent,
    RecoveryFormComponent,
    SendPasswordRecoverySuccessComponent,
    ProfileBodyComponent
  ],
  providers: [
    PurchaseService,
    ServerService
  ]
})
export class PagesModule { }
