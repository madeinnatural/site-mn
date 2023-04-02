import { TestBed } from '@angular/core/testing';

import { ProductSaleServiceService } from './product-sale-service.service';

describe('ProductSaleServiceService', () => {
  let service: ProductSaleServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductSaleServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
