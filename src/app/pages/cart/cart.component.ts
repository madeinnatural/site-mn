import { AlertoInterface } from './../../core/model/Alert';
import { GlobalAlertService } from './../../core/global-alert.service';
import { PurchaseDetail } from './../../core/model/Purchase';
import { Router } from '@angular/router';
import { ServerService } from './../../core/server/server.service';
import { ProductService } from './../../core/global/product.service';
import { ProductList, Cotacao, Purchase } from './../../core/model/Product';
import { PurchaseService } from './../../core/global/purchase.service';
import { Component, OnInit } from '@angular/core';
import { Item } from '../../../app/core/model/Product';
import { GlobalEventService } from 'src/app/core/global/global.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  total = 0;

  preco_entrega: number = 0;

  get total_bruto() {
    return this.preco_entrega + this.total;
  };

  products: Item[] = [];

  // Dpois vc precisa construir um sistema mais robusto, quando cliente solicitar a compra
  // esses produtos va para o servidor e o servidor vai criar uma compra com um token de validação
  // quando for finalizada a compra as compras que foram autenticadas com o token e todos os itens batendo
  // com o que foi solicitado, a compra é finalizada e o cliente recebe um email de confirmação
  // para evitar que uma compra seja enviada com dados modificados e passe.
  constructor(
    public purchaseService: PurchaseService,
    public productService: ProductService,
    public server: ServerService,
    public router: Router,
    public global: GlobalEventService
  ) {
    const products = this.purchaseService.getProductCart();
    if ( products ) this.products = products;

    this.total = this.purchaseService.totalPrice();
  }

  ngOnInit() {}

  removeItem(item: Item) {
    if (item.quantity >= 1) {
      if (item.quantity == 1) {
        item.quantity = 0;
        this.productService.removeItemLocalStoragee(item);
      }
      this.productService.removeItemLocalStoragee(item);
    }

    const index_item_product = this.products.findIndex((item_product: Item) => item_product.product.id == item.product.id)
    if (this.products[index_item_product].quantity > 0) this.products[index_item_product].quantity -= 1;
    else this.products.splice(index_item_product, 1);

    this.total -= item.product.price * item.product.quantity;
  }

  remove(item: Item){
    this.productService.deleteItemCart(item);
  }

  add(item: Item){
    // const index_item_product = this.products.findIndex((item_product: Item) => item_product.product.id == item.product.id)
    // if (this.products[index_item_product].quantity > 0) this.products[index_item_product].quantity += 1;
    // this.productService.addItemCart(item.product);
    console.log(item)
    // console.log(this.products.map(e => {
    //   if(e.product.quantity) {
    //     return e.product.quantity * e.product.price
    //   } return 0
    // }).reduce((total, item) => (total + item), 0))
  }

  async finalizePurchase(){
    try {
      const {id} = await this.purchaseService.finishPurchase()
      this.router.navigate([`purchase_summary`], {queryParams: {id}});
      this.purchaseService.clearCart();
    } catch (error: any) {
      const msg: AlertoInterface = {
        text: 'Erro ao finalizar a compra',
        type: 'danger',
        duration: 5000
      }
      console.error('RESUMO DO ERRO:',error);
      this.global.goAlert.emit(msg);
    }
  }

  creteCotacao() {
    const productCotacao: Cotacao[] = this.products.map((item: Item) => {
      return {
        product_name: item.product.product_name,
        weight: item.product.weight,
        category: item.product.categoria,
        provider_primary: item.product.provider_primary,
        quantity: item.product.quantity,
        total: item.product.price * item.product.quantity,
        price: item.product.price,
        id: item.product.id,
      }
    });

    try {
      this.server.createCotacao(productCotacao).then(data => {
        console.log(data)
        this.router.navigate(['profile/cotacoes']);
      })

    } catch (error) {

      console.log('DEU ERRO NO MOMENTO DE CRIAR A COTAÇÃO', error)

    }
  }


}
