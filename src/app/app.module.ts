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
import { orderReducer } from './states-handler/store/order.store';
import { productSaleReducer } from './states-handler/store/productSale.store';
import { EffectsModule } from '@ngrx/effects';
import { filter, filterSieve, productSieve, provider, ListFilter, getOptionsFilter } from './states-handler/store/filter.store';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { FilterEffectsService } from './states-handler/effect/filter-effects.service';

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
    StoreModule.forRoot(
      {
        productSieve: productSieve,
        order: orderReducer,
        productsSale: productSaleReducer,
        provider: provider,
        currentFilter: filterSieve,
        filter: filter,
      },{}
    ),
    EffectsModule.forRoot([
      FilterEffectsService
    ]),
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
