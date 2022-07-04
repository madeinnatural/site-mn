export class Product {
  constructor(
    public id: number,
    public productName: string,
    public weight: number,
    public price: number,
    public product_type: string,
    public amount: number,
    public categoria?: string,
  ){}
}


export class Item {
  constructor(
    public id: number,
    public product: Product,
    public amount: number,
    public parcial_price: number, // QUANTIDADE * PREÇO DO PRODUTO
  ){}
}

export class CartProduct {
  constructor(
      amount: number,
      id: number,
      parcial_price: number,
      product: Product
  ){}
}
