import { GlobalEventService } from './../../core/global/global.service';
import { CookieService } from '@ngx-toolkit/cookie';
import { SnackProduct } from './../../core/model/interfaces/Product';
import { ActivatedRoute } from '@angular/router';
import { Component} from '@angular/core';
import { SnackService } from '../../core/services/SnackService';

interface TableSnackProduct {
  product: SnackProduct,
  quantity: number,
  subTotal: number,
  typeCharge?: 'box' | 'unit' | 'none';
}


@Component({
  templateUrl: './snack-page.component.html',
  styleUrls: ['./snack-page.component.scss'],
  providers: [SnackService]
})
export class SnackPage {

  productsTable: TableSnackProduct[] = [];

  termo: string = '';
  keyPress(event: any){
    if (event.key == 'Enter') {
      this.sanckService.searchProduct(this.termo);
    }
  }

  constructor(
    public sanckService: SnackService,
    public router: ActivatedRoute,
    public cookie: CookieService,
    public global: GlobalEventService,
  ) {
    const dataResolvers = this.router.data;
    dataResolvers.subscribe((data) => {
      this.sanckService.categories = data['categories'];
      const productList: SnackProduct[] = data['productList'];
      this.productsTable = productList.map((product) => {
        return {
          product,
          quantity: 0,
          subTotal: 0,
        }
      });

      console.log(this.productsTable);
    })
  }

  addProductQuantity(product: TableSnackProduct) {
    product.quantity++;
    if (product.typeCharge == 'box') {
      product.subTotal = product.product.price.box_30 * product.quantity;
    } else if (product.typeCharge == 'unit') {
      product.subTotal = product.product.price.unitary * product.quantity;
    }
  }

  removeProductQuantity(product: TableSnackProduct) {
    if (product.quantity > 1) {
      product.quantity--;
      if (product.typeCharge == 'box') {
        product.subTotal = product.product.price.box_30 * product.quantity;
      } else if (product.typeCharge == 'unit') {
        product.subTotal = product.product.price.unitary * product.quantity;
      }
    } else {
      product.subTotal = 0;
      product.quantity = 0;
      product.typeCharge = undefined;
    }
  }

  changeTypeCharge(product: TableSnackProduct, typeCharge: 'box' | 'unit') {
    product.typeCharge = typeCharge;
    if (product.typeCharge == 'box') {
      product.subTotal = product.product.price.box_30 * product.quantity;
    } else if (product.typeCharge == 'unit') {
      product.subTotal = product.product.price.unitary * product.quantity;
    }

    this.addProductQuantity(product);
  }

}

