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

  constructor(
    public sanckService: SnackService,
    public router: ActivatedRoute
  ) {
    const data = this.router.data;
    data.subscribe((response) => {
      const dataR: {
        product: Observable<any>,
        categeories: Observable<Categorie[]>
      } = (response as any).data;

      function vefiryQuantity(productId: number) {
        return 0
      }

      function vefirySubTotal(productId: number) {
        return 0
      }

      dataR.product.pipe(map(
        productr => {
          return productr.map((product:any) => {
            return {
              id: product.id,
              display_name: product.display_name ? product.display_name : product.product_name,
              name: product.product_name,
              price: product.price,
              product_weight: product.weight,
              quantity: vefiryQuantity(product.id),
              subTotal: vefirySubTotal(product.id),
              secondary_category: product.secondary_category,
            }
          })
        }
      )).subscribe((response) => {
        console.log(response);
        this.sanckService.productInCart = response;
      })

      dataR.categeories.subscribe((response) => {
        // console.log(response);
      });

    });
  }


  async ngOnInit() {
   await this.sanckService.refresh();
  }


}

