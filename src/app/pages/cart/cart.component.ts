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
export class CartComponent {

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

  async finishPurchase() {
    try {
      const cart: any = this.productService.getCart()
      .filter( item => item.product.quantity > 0 )
      .map(item => {
        return {
          product_name: item.product.product_name,
          weight: item.product.weight,
          category: item.product.categoria,
          provider_primary: item.product.provider_primary,
          quantity: item.product.quantity,
          price: item.product.price
        }
      });

      return this.server.finishPurchase(cart);

    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  errorMsg: string = '';
  error: boolean = false;

  async finalizePurchase(){
    try {
      if (this.total < 700) {
        const msg = 'Valor mínimo para finalizar a compra é de R$ 700,00'
        this.errorMsg = msg;
        throw new Error(msg);
      }

      const {id} = await this.finishPurchase()

      const text = `Recebemos o seu pedido com sucesso! Agora é só aguardar nosso time
      entrar em contato, se preferir ligue para a gente: (11) 95285-2681. Muito obrigado :)`;

      const msg: AlertoInterface = {
        text,
        type: 'success',
        duration: 20000
      }

      this.global.goAlert.emit(msg);

      this.router.navigate([`profile/pedidos`], { queryParams: {id}});

      this.purchaseService.clearCart();
    } catch (error: any) {
      const msg: AlertoInterface = {
        text: error.message,
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

// MANIPULAÇÃO DE PRODUTOS
  removeItem(itemId: number) {
    this.productService.decreseItem(itemId);
    this.descremetarItemCartLocal(itemId);
  }

  remove(itemId: number){
    this.productService.deleteItemCart(itemId);
    this.removeItemCartLocal(itemId);
  }

  add(itemId: number){
    console.log(this.productService.listProduct)
    this.productService.addItem(itemId);
    this.addItemCartLocal(itemId);
  }

  private addItemCartLocal (itemId: number) {
    const index_current_product = this.products.findIndex((item: Item) => item.product.id === itemId);
    const produto_existe = index_current_product !== -1;
    if (produto_existe) {
      this.products[index_current_product].product.quantity += 1;
      const total = this.products[index_current_product].product.price * this.products[index_current_product].product.quantity * this.products[index_current_product].product.weight;
      this.products[index_current_product].product.total = total;
      this.products[index_current_product].parcial_price = total;
      this.products[index_current_product].quantity += 1;
      this.total = this.purchaseService.totalPrice();
    } else {
      throw new Error('Produto não existe no carrinho ³');
    }
  }


  private removeItemCartLocal (itemId: number) {
    const index_current_product = this.products.findIndex((item: Item) => item.product.id === itemId);
    const produto_existe = index_current_product !== -1;
    if (produto_existe) {
      this.products.splice(index_current_product, 1);
    } else {
      throw new Error('Produto não existe no carrinho ¹');
    }
  }

  private descremetarItemCartLocal (itemId: number) {
    const index_current_product = this.products.findIndex((item: Item) => item.product.id === itemId);
    const produto_existe = index_current_product != -1;

    if (produto_existe) {
      const quantidade_do_produto = this.products[index_current_product].product.quantity;
      if (quantidade_do_produto == 1) {
        this.total -= this.products[index_current_product].parcial_price;
        this.products.splice(index_current_product, 1);
        this.removeItemCartLocal(itemId);
      } else {
        this.products[index_current_product].product.quantity -= 1;
        const total = this.products[index_current_product].product.price * this.products[index_current_product].product.quantity * this.products[index_current_product].product.weight;
        this.products[index_current_product].product.total = total
        this.products[index_current_product].parcial_price = total
        this.products[index_current_product].quantity = this.products[index_current_product].product.quantity;
        this.total = this.purchaseService.totalPrice();
      }
    } else {
      throw new Error('Produto não existe no carrinho ²');
    }
  }

}
