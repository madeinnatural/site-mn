interface Package {
  id: string
  name: string
  products:  ProductModel[]
}

interface Unit {
  id: string
  name: string
  products: ProductModel[]
}

interface Category {
  id: string
  name: string
  products: ProductModel[]
}

export interface ProductModel {
  id: string
  name: string
  code: string
  provider: 'celmar' | 'rmoura'
  price: number
  weight: number
  obs: string
  unit: Unit[]
  package: Package[];
  category: Category[];
  mainCategory: Category[];
  subCategory: Category[];
}
