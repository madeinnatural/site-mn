import { SnackProduct } from '../interfaces/Product';
import { CartStorage } from './CartStorage';

export abstract class SnackAbstract extends CartStorage {

  constructor() {
    super();
  }

  protected abstract increment(id: number): void;

  protected abstract decrement(id: number): void;

  protected abstract remove(product: SnackProduct): void

  protected abstract add(product: SnackProduct): void

  protected abstract refresh(): void

}
