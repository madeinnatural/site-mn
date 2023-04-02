

export class Item {
  constructor(
    public id: number,
    public product: ProductList,
    public quantity: number,
    public parcial_price: number, // QUANTIDADE * PREÇO DO PRODUTO
  ){}
}

export interface CartProduct {
  quantity: number,
  id: number,
}

export class Purchase {
  constructor(
    public id: number,
    public name: string,
    public weight: number,
    public category: string,
    public provider_primary: string,
    public quantity: number,
    public price: number,
    public final_price: number,
    public updated_at: Date,
    public created_at: Date,
    public products?: ProductList[],
  ){}
}

export class PurchaseHistory {
  constructor(
    public year: number,
    public purchasesByMonth: Array<{month: string, purchases: Purchase[], final_price: number}>,
  ){}
}

export class Cotacao {
  constructor(
    public id: number,
    public name: string,
    public weight: number,
    public price: number,
    public quantity: number,
    public provider?: string,
    public provider_primary?: string,
    public provider_tertiary?: string,
    public categoria?: string,
    public product_details?: Array<ProductDetail>
  ){}
}

export class ProductDetail {
  constructor(
    produto: string,
    kg: number,
    price: number,
    categoria: number,
    ativo: number,
    unidade: string,
    categoria2: string,
    categoria4: string,
    ativo_editavel: string,
    qtdd_gramas: string,
    quantidade: string,
  ){}
}

export interface AvancedFilter {
  termo?: string,
  price: number;
  category: string;
}

export interface DataBar {
  total: number,
  quantidade: number,
}

export interface DataSearch {
  data: ProductResponse[],
  more_product: boolean,
}

export interface ProductListRequest {
  name: string,
  weight: number,
  price: number,
  quantity: number,
  provider_primary: string,
  total: number,
  categoria?: string,
}

export interface Snack {
  id: number;
  display_name: string;
  name: string;
  price: number;
  quantity: number;
  product_weight: number;
  secondary_category: string;
}

export interface CategoriePrice  {
  box_30?: number,
  unitary?: number,
  box?: number,
}

export interface CategorieWeight {
  box?: string,
  kg?: number
}

export interface SnackProduct {
  id: number;
  display_name: string;
  name: string;
  price: CategoriePrice;
  weight: CategorieWeight;
  secondary_category: string;
}

// Vem do servidor da planilha de Editaveis.
export interface ProductResponse {
  id: number,
  active: boolean,
  name: string,
  unidade: string,
  price_category: {
    weight_unit: number,
    packing: number
  },
  product_categories: {
    main: string,
    sub: string,
    ordinary: string
  },
  product_attributes: {
    weight_unit: number,
    packing: {
      packing_quantity: number,
      packing_weight: number
    }
  }
}

// Envia para o servidor da planilha de Editaveis para registro de produto na compra.
export interface ProductRequest {
  name: string,
	quantity: number,
	price: number, // Preço Caixa ou kg
  packing: string // Caixa ou KG unidade
  product_categories: {
    main: string,
    sub: string,
    ordinary: string
  },
}

export interface Product {
  code: string,
  name: string,
  weight: number,
  obs: string,
  unit: string,
  price: number,
  package: string,
  provider: 'rmoura' | 'celmar',
  category_main: string,
  category_sub: string,
}

// Mostra os produtos na tela de compra.
export interface ProductsDisplay {
  product: Product,
  quantity: number,
}

export interface ProductList {
  quantity: number,
  product: Product,
}
