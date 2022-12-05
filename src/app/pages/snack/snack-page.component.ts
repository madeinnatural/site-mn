import { GlobalEventService } from './../../core/global/global.service';
import { CookieService } from '@ngx-toolkit/cookie';
import { Product, SnackProduct } from './../../core/model/interfaces/Product';
import { Observable, map, mapTo } from 'rxjs';
import { Categorie } from './../../core/services/SnackService';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component} from '@angular/core';
import { SnackService } from '../../core/services/SnackService';


@Component({
  templateUrl: './snack-page.component.html',
  styleUrls: ['./snack-page.component.scss'],
  providers: [SnackService]
})
export class SnackPage implements OnInit {

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
    const data = this.router.data;
    data.subscribe((response) => {
      const dataR: {
        product: Observable<any>,
        categeories: Observable<Categorie[]>
      } = (response as any).data;

      const cartLocalStorage = cookie.getItem(global.CART_PATH);
      let cart = cartLocalStorage ? JSON.parse(cartLocalStorage) : null;

      const vefiryQuantity = (productId: number) => {
        if (cart) {
          const product = cart.find((product: Product) => product.id == productId);
          if (product) {
            return product.quantity;
          } else {
            return 0;
          }
        } else {
          return 0
        }
      }

      const vefirySubTotal = (productId: number) => {
        if (cart) {
          const product = cart.find((product: Product) => product.id == productId);
          if (product) {
            return product.parcial_price;
          } else {
            return 0
          }
        } else {
          return 0
        }
      }

      dataR.product.pipe(map(
        productr => {
          const data = productr.map((product:any) => {
            return {
              id: product.id,
              display_name: product.display_name,
              name: product.product_name,
              price: product.price,
              product_weight: product.weight,
              quantity: vefiryQuantity(product.id),
              subTotal: vefiryQuantity(product.id) * product.price * product.weight,
              secondary_category: product.secondary_category,
            }
          })
          console.log(data);
          return data
        }
      )).subscribe((response) => {
        this.sanckService.productInCart = response;
      })

      dataR.categeories.subscribe((response) => {
        this.sanckService.categories = response;
      });

    });
  }


  async ngOnInit() {
   await this.sanckService.refresh();
  }


}

