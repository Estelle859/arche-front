import { TestBed } from '@angular/core/testing';

import { LignePanierService } from './ligne-panier.service';

describe('LignePanierService', () => {
  let service: LignePanierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LignePanierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
