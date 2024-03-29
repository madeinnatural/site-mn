import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list'
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgbModule, NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { productShowcaseReducer } from './states-handler/store/product-showcase.store';
import { AuthInterceptor } from './core/security/auth.interceptor';
import { phoneMaskBrDirective } from './core/directives/phone-mask-br.directive';
import { ComponentsModule } from './components/components.module';
import { PagesModule } from './pages/pages.module';
import { AppRoutingModule } from './app-routing.module';
import { currentFilter, provider, filtersProvider } from './states-handler/store/filter.store';
import { AppComponent } from './app.component';
import { AuthQuard } from './core/guards/auth.quard';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { FilterEffectsService } from './states-handler/effect/filter-effects.service';
import { environment } from '../environments/environment';
import { ProductEffectService } from './states-handler/effect/product-effect.service';
import { productReducer, propsPageReducer } from './states-handler/store/product.store';
import { cartReducer } from './states-handler/store/cart.store';
import { CartEffectsService } from './states-handler/effect/cart.effects.service';
import { orderReducer } from './states-handler/store/order.store';
import { accountReducer } from './states-handler/store/account.store';
import { AccountEffectsService } from './states-handler/effect/account.effect.service';
import { errorReducer } from './states-handler/store/error.store';
import { addressReducer } from './states-handler/store/address.store';
import { PurchaseEffectService } from './states-handler/effect/purchase.effect.service';
import { purchaseHistoryReducer, purchaseReducer } from './states-handler/store/pruchase.store';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { breadcrumbReducer } from './states-handler/store/breadcrumb.store';
import { MesPorExtensoPipe } from './core/pipe/monthExtencer.pipe';

@NgModule({
  declarations: [
    AppComponent,
    phoneMaskBrDirective,
    MesPorExtensoPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    ComponentsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressBarModule,
    BrowserAnimationsModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    MatFormFieldModule,
    FontAwesomeModule,
    NgxSliderModule,
    StoreModule.forRoot({
      productShowcase  :productShowcaseReducer,
      filtersProvider  :filtersProvider,
      getProducts      :productReducer,
      currentFilter    :currentFilter,
      cart             :cartReducer,
      provider         :provider,
      order            :orderReducer,
      propsPage        :propsPageReducer,
      account          :accountReducer,
      error            :errorReducer,
      address          :addressReducer,
      purchases        :purchaseReducer,
      purchasesHistory :purchaseHistoryReducer,
      breadcrumb       :breadcrumbReducer
    },{}),
    EffectsModule.forRoot([
      FilterEffectsService,
      ProductEffectService,
      CartEffectsService,
      AccountEffectsService,
      PurchaseEffectService
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [
    AuthQuard,
    MatSnackBar,
    MatSnackBarConfig,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
