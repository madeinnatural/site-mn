import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CookieService } from '@ngx-toolkit/cookie';
import { Router } from '@angular/router';
import { Item, ProductList } from '../model/interfaces/Product';
import { Injectable } from '@angular/core';
import { ServerService } from '../services/server.service';
import { PurchaseService } from './purchase.service';
import { GlobalEventService } from './global.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
//   currentPage: number = 1;
//   listProduct: Array<ProductList> = [];
//   noMoreProduct: boolean = false;

//   getProductCart(): Item[] {
//     const cart = this.cookieService.getItem('cart');
//     if (cart) {
//       const cart_current = JSON.parse(cart);
//       if (cart_current.length > 0) {
//         return cart_current;
//       } else {
//         return [];
//       }
//     } else {
//       return [];
//     }
//   }

//   constructor(
//     public server: ServerService,
//     public purchaseService: PurchaseService,
//     private globalEventService: GlobalEventService,
//     private router: Router,
//     private cookieService: CookieService,
//     public http: HttpClient
//   ) {}

//   total = 0;

//   totalPrice() {
//     const cart_jason = this.cookieService.getItem('cart');

//     if (cart_jason) {
//       const cart = this.getCartLocalStorage();

//       if (!cart) return 0

//       let total = 0;
//       for (let i = 0; i < cart.filter((e) => e.parcial_price > 0).length; i++) {
//         total += cart[i].parcial_price;
//       }

//       return total;
//     }

//     return 0;
//   }

//   cartLength () {
//     const cart_j = this.cookieService.getItem('cart')
//     if (cart_j) {
//       return JSON.parse(cart_j).length
//     }
//     return 0
//   }

//   getQuantidade(){
//     return this.cartLength();
//   }

//   getTotal(){
//     return this.totalPrice();
//   }

//   calculeQuantidade(id: number, productCart: ProductList[]): number {
//     return productCart
//     .filter((product) => product.id == id)
//     .map((product) => product.quantity)
//     .reduce((previousValue, currentValue) => previousValue + currentValue,0)
//   }

//   pullProductSever(page: number = 0) {
//     const listItem = this.getProductCart();
//     const productsCart = listItem.map((item) => item['product']);
//     return this.http.get<ProductList[]>(environment.baseUrl, {params: {page}})
//     .pipe(map((products) => {
//       return products.map((product) => {
//           // product['price'] = product['price'] ? product['price'] : 0.0;
//           product['provider_primary'] = product['provider_primary'] != '' ? product['provider_primary'] : 'INDEFINIDO';
//           product['quantity'] = this.calculeQuantidade(product.id, productsCart);
//           return product;
//         }).filter((product) => product['name'] != 'produto');
//       }
//     )).pipe(map((products) => { this.listProduct = products; return products; }));
//   }

//   private getCartLocalStorage(): Array<Item> | null {
//     const data = this.cookieService.getItem('cart');
//     if (data) return JSON.parse(data);
//     return null;
//   }

//   veryfy_product_in_cart(products: ProductList[]) {
//     const productCart = this.getProductCart();

//     function current_amount(id: number) {
//       let quantity = 0;

//       productCart?.forEach((productCart) => {
//         if (id == productCart.id) quantity = productCart.quantity;
//       });

//       return quantity;
//     }

//     console.log(products);

//     // this.listProduct = products.map((e) => {
//     //   return {
//     //     id: e.id,
//     //     name: e.name,
//     //     price: e.price ? e.price : 0.0,
//     //     provider_primary: e.provider_primary != '' ? e.provider_primary : 'INDEFINIDO',
//     //     weight: e.weight ? e.weight : 0.0,
//     //     quantity: current_amount(e.id),
//     //   };
//     // });

//     return this.listProduct;
//   }

//   showProductsAll() {
//     this.server.getProductListHome(this.currentPage == 3 ? -1 : this.currentPage)
//     .subscribe((products) => {
//       const productCart = this.getProductCart();

//       if (products.length == 0) this.noMoreProduct = true;

//       function current_amount(id: number) {
//         let quantity = 0;

//         productCart?.forEach((productCart) => {
//           if (id == productCart.id) {
//             quantity = productCart.quantity;
//           }
//         });

//         return quantity;
//       }

//       // products.map((e) => {
//       //   this.listProduct.push({
//       //     id: e.id,
//       //     name: e.name,
//       //     price: e.price ? e.price : 0.0,
//       //     provider_primary:
//       //       e.provider_primary != '' ? e.provider_primary : 'INDEFINIDO',
//       //     weight: e.weight ? e.weight : 0.0,
//       //     quantity: current_amount(e.id),
//       //   });
//       });

//       this.currentPage += 1;
//     });
//   }

//   initCart(productId: number) {
//     this.addItem(productId);
//   }

//   getCart() {
//     const cart = this.getProductCart();
//     if (cart) {
//       return cart;
//     } else {
//       throw new Error('Ainda sem carrinho de compras');
//     }
//   }

//   deleteItemCart(itemId: number) {
//     let cart = this.getCartLocalStorage();
//     if (cart) {
//       const index_current_product = cart.findIndex((e) => e.id == itemId);
//       const index_current_product_in_list = this.listProduct.findIndex((e) => e.id == itemId);

//       const producto_exite_no_product_list = index_current_product_in_list != -1;
//       const producto_exite_no_carrinho = index_current_product != -1;

//       if ( producto_exite_no_carrinho ) {
//         cart.splice(index_current_product, 1);
//         this.cookieService.setItem('cart', JSON.stringify(cart));
//       } else {
//         throw new Error('Produto não encontrado no carrinho');
//       }

//       if ( producto_exite_no_product_list ) {
//         this.listProduct[index_current_product_in_list].total = 0;
//         this.listProduct[index_current_product_in_list].quantity = 0;
//       } else {
//         return;
//       }

//     } else {
//       throw new Error('Ainda sem carrinho de compras');
//     }
//   }

//   setProductCart(cart: Array<Item>) {
//     if (cart) {
//       const _cart = JSON.stringify(cart);
//       if (this.cookieService.hasItem('cart')) {
//         this.cookieService.removeItem('cart');
//         this.cookieService.setItem('cart', _cart);
//       }
//     }
//   }

//   goProductList(query: string) {
//     this.router.navigate(['product_list'], { queryParams: { query } });
//   }

// //Manipulação do carrinho de compras

//   addItem(itemId: number) {
//     try {
//       this.adicionar_item_no_product_list(itemId);
//       this.adicionar_item_no_carrinho(itemId);
//       this.globalEventService.addItemCartEmit.emit('add:cart');
//     } catch (error) {
//       this.globalEventService.goAlert.emit({
//         text: 'Erro ao adicionar produto no carrinho',
//         type: 'danger',
//         duration: 3500
//       })
//       console.log('ERROR: ', error);
//     }
//   }

//   decreseItem(itemId: number) {
//     try {
//       this.remover_item_no_product_list(itemId);
//       this.remover_tem_no_carrinho(itemId);
//       this.globalEventService.addItemCartEmit.emit('removel:cart');
//     } catch (error) {
//       this.globalEventService.goAlert.emit({
//         text: 'Erro ao remover produto no carrinho',
//         type: 'danger',
//         duration: 3500
//       })
//       console.log('ERROR: ', error);
//     }
//   }

// // PRIVATE METHODS:
//   // => ADD ITEM NO CARRINHO
//   private adicionar_item_no_product_list(productId: number) {

//     const product = this.listProduct.find((product) => product.id == productId);

//     if (product) {

//       const index_current_list_product = this.listProduct.findIndex((e) => e.id == product.id);
//       const exist_item_no_product_list = index_current_list_product != -1;

//       if ( exist_item_no_product_list ) {
//         this.listProduct[index_current_list_product].quantity += 1;
//         this.listProduct[index_current_list_product].total = this.listProduct[index_current_list_product].price * this.listProduct[index_current_list_product].quantity * this.listProduct[index_current_list_product].weight;
//       } else {
//         product.quantity = 1;
//         product.total = product.price * product.quantity * product.weight;
//         this.listProduct.push(product);
//       }

//     } else if (this.listProduct.length == 0) {
//       return;
//     } else {
//       throw new Error('Não existe produto na lista com esse id');
//     }

//   }
//   private adicionar_item_no_carrinho (productId: number) {
//     let cart = this.getCartLocalStorage();
//     if (cart) {
//       const item = cart.find((product_cart) => product_cart.id == productId);

//       if (item) {
//         const index_do_item_no_carrinho = cart.findIndex((e) => e.id == item.id);
//         const existe_item_no_carrinho = index_do_item_no_carrinho != -1;

//         if (existe_item_no_carrinho) {
//           cart[index_do_item_no_carrinho].quantity += 1;
//           cart[index_do_item_no_carrinho].parcial_price = cart[index_do_item_no_carrinho].product.price * cart[index_do_item_no_carrinho].quantity * cart[index_do_item_no_carrinho].product.weight;
//           cart[index_do_item_no_carrinho].product.total = cart[index_do_item_no_carrinho].product.price * cart[index_do_item_no_carrinho].quantity * cart[index_do_item_no_carrinho].product.weight;
//           cart[index_do_item_no_carrinho].product.quantity = cart[index_do_item_no_carrinho].quantity;
//         } else {
//           item.quantity = 1;
//           item.parcial_price = item.product.price * item.quantity * item.product.weight;
//           item.product.total = item.product.price * item.quantity * item.product.weight;
//           item.product.quantity = item.quantity;
//           cart.push(item);
//         }
//         this.cookieService.setItem(this.globalEventService.CART_PATH, JSON.stringify(cart));

//       } else {

//         const product = this.listProduct.find((product) => product.id == productId);

//         if (product) {
//           const item: Item = {
//             id: product.id,
//             quantity: product.quantity,
//             parcial_price: product.price * product.quantity * product.weight,
//             product: product,
//           }

//           cart.push(item);

//           this.adicionarCartLocalStorage(cart);

//         } else {
//           throw new Error('Produto não encontrado: (1) Adicionar ao carrinho => ' + productId);
//         }
//       }

//     } else {

//       const product = this.listProduct.find((product) => product.id == productId);
//       if (product) {
//         product.quantity = 1;
//         product.total = product.price * product.quantity;
//         const item: Item = {
//           id: product.id,
//           quantity: product.quantity,
//           parcial_price: product.price,
//           product: product,
//         }
//         this.adicionarCartLocalStorage([item]);
//       } else {
//         throw new Error('Produto não encontrado: (2) Adicionar ao carrinho => ' + productId);
//       }
//     }
//   }
//   protected adicionarCartLocalStorage(item: Item[]) {
//     this.cookieService.setItem(this.globalEventService.CART_PATH, JSON.stringify(item));
//   }

//   // => DECRECENTAR ITEM NO CARRINHO
//   private remover_item_no_product_list(itemId: number) {

//     const product = this.listProduct.find((e) => e.id == itemId);

//     if (product) {

//       const index_elemento_product_list = this.listProduct.findIndex( (product) => product.id == itemId);
//       const elemento_existe_product_list = index_elemento_product_list > -1;

//       if ( elemento_existe_product_list ) {

//         const ultima_unidade_de_produto = product.quantity == 1;

//         if ( ultima_unidade_de_produto ) {
//           product.quantity = 0;
//         } else {
//           product.quantity -= 1;
//         }

//         product.total = product.quantity * product.price * product.weight;
//         this.listProduct[index_elemento_product_list] = product;
//       } else {
//         throw new Error('Produto não encontrado na lista de produtos');
//       }

//     } else if (this.listProduct.length == 0) {
//       return;
//     } else {
//       throw new Error('Não é possível remover item: Produto não encontrado');
//     }

//   }
//   private remover_tem_no_carrinho(itemId: number) {
//     const cart = this.getCartLocalStorage();
//     if (cart) {
//       const index_do_product_no_carrinho = cart.findIndex( (e) => e.id == itemId);
//       const elemento_existe_no_carrinho = index_do_product_no_carrinho > -1;
//       if (elemento_existe_no_carrinho) {
//         const product = cart[index_do_product_no_carrinho];
//         const ultima_unidade_de_produto = product.quantity == 1;

//         if (ultima_unidade_de_produto) {
//           cart.splice(index_do_product_no_carrinho, 1);
//         } else {
//           product.quantity -= 1;
//           product.product.quantity -= 1;

//           product.parcial_price = product.product.price * product.quantity * product.product.weight;
//           product.product.total = product.product.price * product.product.quantity * product.product.weight;

//           cart[index_do_product_no_carrinho] = product;
//         }
//         this.cookieService.setItem(this.globalEventService.CART_PATH, JSON.stringify(cart));
//       } else {
//         throw new Error('Produto não encontrado no carrinho');
//       }
//     } else {
//       throw new Error('Não é possível remover item: Carrinho não encontrado');
//     }
//   }
}
