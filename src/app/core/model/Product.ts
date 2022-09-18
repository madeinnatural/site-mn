export class ProductList {
  constructor(
    public id: number,
    public product_name: string,
    public weight: number,
    public price: number,
    public quantity: number,
    public provider?: string,
    public provider_primary?: string,
    public provider_tertiary?: string,
    public categoria?: string,
    public unit?: string,
    public created_at?: Date
  ){}
}

export class Product {
  constructor(
    public id: number,
    public productName: string,
    public weight: number,
    public price: number,
    public quantity: number,
    public categoria?: string,
  ){}
}

export class Item {
  constructor(
    public id: number,
    public product: ProductList,
    public quantity: number,
    public parcial_price: number, // QUANTIDADE * PREÇO DO PRODUTO
  ){}
}

export class CartProduct {
  constructor(
      quantity: number,
      id: number,
      parcial_price: number,
      product: ProductList
  ){}
}

export class Purchase {
  constructor(
    public id: number,
    public product_name: string,
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
    public product_name: string,
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
    preco: number,
    categoria: number,
    ativo: number,
    fornecedor: string,
    unidade: string,
    nome_exibicao: string,
    categoria2: string,
    categoria4: string,
    ativo_editavel: string,
    qtdd_gramas: string,
    quantidade: string,
    margem_30: string,
    margem_1k: string,
    margem_caixa: string,
  ){}
}

