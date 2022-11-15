import { IconComponent } from './icon/icon.component';
import { ResumoCompraComponent } from './resumo-compra/resumo-compra.component';
import { GlobalAlertComponent } from './global-alert/global-alert.component';
import { AvancedFilterComponent } from './avanced-filter/avanced-filter.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PurchaseService } from './../core/global/purchase.service';
import { FormComponent } from './form/form.component';
import { LoadingComponent } from './loading/loading.component';
import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { MenuProfileComponent } from './menu-profile/menu-profile.component';
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
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ToastComponent } from './toast/toast.component';
import { TextMaskModule } from '@myndmanagement/text-mask';

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
import { MatFormFieldModule } from '@angular/material/form-field';
import { ModalComponent } from './modal/modal.component';
import { MnInputComponent } from './input/input.component';
import { MnButtonComponent } from './mn-button/mn-button.component';
import { MnFormComponent } from './mn-form/mn-form.component';
import { PaginatorComponent } from './paginator/paginator.component';

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
    SearchHeaderComponent,
    BreadcrumbsComponent,
    ToastComponent,
    ModalComponent,
    MnInputComponent,
    MnButtonComponent,
    MnFormComponent,
    AvancedFilterComponent,
    PaginatorComponent,
    GlobalAlertComponent,
    ResumoCompraComponent,
    IconComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    FormsModule,
    NgbModule,
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
    TextMaskModule,
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
    SearchHeaderComponent,
    BreadcrumbsComponent,
    ToastComponent,
    ModalComponent,
    MnInputComponent,
    MnButtonComponent,
    MnFormComponent,
    AvancedFilterComponent,
    PaginatorComponent,
    GlobalAlertComponent,
    ResumoCompraComponent,
    IconComponent
  ],
})
export class ComponentsModule {}
