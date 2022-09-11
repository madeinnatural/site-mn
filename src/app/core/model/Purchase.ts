import { Item } from './Product';

export type PurchaseDetail = {
  id: number;
  create_at: Date;
  updated_at: Date;
  item: Array<Item>
}
