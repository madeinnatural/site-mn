import { AccountModel } from "../account/account";

export interface PurchaseHistory {
  id:          string;
  totalAmount: number;
  date:        string;
  cart:        Cart;
}

interface Cart {
  id:        string;
  accountId: string;
  total:     number;
  createdAt: string;
  updatedAt: string;
  cartItem:  CartItem[];
  account:   AccountModel;
  purchase:  Purchase[];
}

interface CartItem {
  id:        string;
  productId: string;
  quantity:  number;
  cartId:    string;
  createdAt: string;
  updatedAt: string;
  product:   Product;
}

interface Product {
  id:        string;
  name:      string;
  weight:    number;
  price:     number;
  provider:  string;
  createdAt: string;
  updatedAt: string;
}


interface Purchase {
  id:              string;
  paymentMethod:   string;
  shippingAddress: string;
  shippingPrice:   number;
  total:           number;
  status:          string;
  createDate:      string;
  updateDate:      string;
  cartId:          string;
  accountId:       string;
  createdAt:       string;
  updatedAt:       string;
}

