import { TestBed } from '@angular/core/testing';

import { ProduitDetailGuard } from './produit-detail.guard';

describe('ProduitDetailGuard', () => {
  let guard: ProduitDetailGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProduitDetailGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
