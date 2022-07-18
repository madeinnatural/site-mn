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


@NgModule({
  declarations: [
    HeaderComponent,
    CarrouselComponent,
    ProductsCartComponent,
    FooterComponent,
    DropdownComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    MatProgressBarModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  exports: [
    HeaderComponent,
    CarrouselComponent,
    ProductsCartComponent,
    FooterComponent,
    DropdownComponent
  ]
})
export class ComponentsModule { }
