import { productShowcaseReducer } from './states-handler/store/product-showcase.store';
import { HttpService } from './core/services/http.service';
import { AuthInterceptor } from './core/security/auth.interceptor';
import { phoneMaskBrDirective } from './core/directives/phone-mask-br.directive';
import { ComponentsModule } from './components/components.module';
import { PagesModule } from './pages/pages.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgbModule, NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthQuard } from './core/guards/auth.quard';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { currentFilter, provider, filtersProvider } from './states-handler/store/filter.store';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { FilterEffectsService } from './states-handler/effect/filter-effects.service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
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
import { purchaseReducer } from './states-handler/store/pruchase.store';

@NgModule({
  declarations: [
    AppComponent,
    phoneMaskBrDirective,
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
      productShowcase :productShowcaseReducer,
      filtersProvider :filtersProvider,
      getProducts     :productReducer,
      currentFilter   :currentFilter,
      cart            :cartReducer,
      provider        :provider,
      order           :orderReducer,
      propsPage       :propsPageReducer,
      account         :accountReducer,
      error           :errorReducer,
      address         :addressReducer,
      purchases       :purchaseReducer
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
    HttpService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
