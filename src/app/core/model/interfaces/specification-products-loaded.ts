export interface CelmarProductFilter {
  mainCategoryId: string,
  subCategoryId: string,
  packageId: string,
  price: {
    min: number,
    max: number
  }
}

export interface RmouraProductFilter {
  unitId: string,
  categoryId: string,
  packageId: string,
  price: {
    min: 0,
    max: 2000
  }
}

export interface Pagination {
  page: number,
  limit: number
}

export interface SpecificationProductsLoaded <T> {
  filter: T,
  paginator: Pagination,
  text: string
}
