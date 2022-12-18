import { CategoriesResolver } from './core/resolvers/categories.resolver';
import { SnackResolve } from './core/resolvers/product-snacks.resolver';
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
    FontAwesomeModule
  ],
  providers: [
    AuthQuard,
    SnackResolve,
    CategoriesResolver,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
