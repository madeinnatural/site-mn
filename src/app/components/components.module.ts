import { FooterComponent } from './footer/footer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { HeaderComponent } from './header/header.component';
import { CarrouselComponent } from './carrousel/carrousel.component';
import { ProductsCartComponent } from './products-cart/products-cart.component';


@NgModule({
  declarations: [
    HeaderComponent,
    CarrouselComponent,
    ProductsCartComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule
  ],
  exports: [
    HeaderComponent,
    CarrouselComponent,
    ProductsCartComponent,
    FooterComponent
  ]
})
export class ComponentsModule { }
