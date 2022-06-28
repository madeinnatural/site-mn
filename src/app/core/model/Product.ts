export class Product {
  constructor(
    public id: number,
    public productName: string,
    public weight: number,
    public price: number,
    public product_type: string,
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
