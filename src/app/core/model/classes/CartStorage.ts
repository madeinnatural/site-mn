import { SnackProduct } from '../interfaces/Product';
export abstract class CartStorage {
  constructor() {}

  protected abstract incrementCart(id: number): void;

  protected abstract decrementCart(id: number): void;

  protected abstract removeCart(product: SnackProduct): void

  protected abstract addCart(product: SnackProduct): void

  protected abstract refreshCart(): void
}
