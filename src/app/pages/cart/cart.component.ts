import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductModel, addProductOrder, addProductShowcase, removeAllProductWithId, removeProductOrder, removeProductShowcase } from 'src/app/components/products-cart/imports';
import { CartModel, Order } from 'src/app/core/domain/model/logistics/cart';
import { addItem, removeItem, removeProductCartById } from 'src/app/states-handler/store/cart.store';
import { purchaseOrder } from 'src/app/states-handler/store/pruchase.store';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  cart$ = this.store.select('cart');
  private orders: Order[] = [];
  constructor(
    public router: Router,
    private store: Store<{cart: CartModel, order: Order[]}>
  ) {
    this.store.select('order').subscribe((orders: Order[]) => {
      for(const order of orders) {
        this.cart$.subscribe((cart: CartModel) => {
        if (order.quantity <= 0) {
            const product = cart.cartItem.find((product: ProductModel) => product.id === order.productId);
            if (product) {
              this.store.dispatch(addItem({product}));
            }
          }
        })
      }
      this.orders = orders;
    });
  }

  getQuantityProduct(id: string) {
    const order = this.orders.find((order: Order) => order.productId === id);
    return order ? order.quantity : 0;
  }

  getSubTotal(product: ProductModel) {
    const order = this.orders.find((order: Order) => order.productId === product.id);
    return order ? order.quantity * product.price : 0;
  }

  async finishPurchase() {
    try {

    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async finalizePurchase(){
    this.store.dispatch(purchaseOrder());
  }


// MANIPULAÇÃO DE PRODUTOS
  removeItem(product: ProductModel) {
    this.store.dispatch(removeAllProductWithId({productId: product.id}));
    this.store.dispatch(removeProductCartById({productId: product.id}));
  }

  remove(product: ProductModel) {
    this.store.dispatch(removeProductOrder({productId: product.id}));
    this.store.dispatch(removeProductShowcase({product}));
    this.store.dispatch(removeItem({product}));
  }

  add(product: ProductModel) {
    this.store.dispatch(addProductOrder({productId: product.id}));
    this.store.dispatch(addProductShowcase({product}));
    this.store.dispatch(addItem({product}));
  }

}
