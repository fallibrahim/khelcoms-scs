import { TestBed } from '@angular/core/testing';

import { ProduitEditGuard } from './produit-edit.guard';

describe('ProduitEditGuard', () => {
  let guard: ProduitEditGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProduitEditGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
