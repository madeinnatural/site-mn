import { FormComponent } from './form/form.component';
import { LoadingComponent } from './loading/loading.component';
import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { MenuProfileComponent } from './menu-profile/menu-profile.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FooterComponent } from './footer/footer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { HeaderComponent } from './header/header.component';
import { CarrouselComponent } from './carrousel/carrousel.component';
import { ProductsCartComponent } from './products-cart/products-cart.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { FormsModule } from '@angular/forms';
import { SearchHeaderComponent } from './search-header/search-header.component';


@NgModule({
  declarations: [
    HeaderComponent,
    CarrouselComponent,
    ProductsCartComponent,
    FooterComponent,
    DropdownComponent,
    MenuProfileComponent,
    InputFieldComponent,
    ErrorMsgComponent,
    LoadingComponent,
    FormComponent,
    SearchHeaderComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    MatProgressBarModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    CarrouselComponent,
    ProductsCartComponent,
    FooterComponent,
    DropdownComponent,
    MenuProfileComponent,
    InputFieldComponent,
    ErrorMsgComponent,
    LoadingComponent,
    FormComponent,
    SearchHeaderComponent
  ]
})
export class ComponentsModule { }
