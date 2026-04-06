import { TestBed } from '@angular/core/testing';

import { QuantityLedgService } from './quantity-ledg.service';

describe('QuantityLedgService', () => {
  let service: QuantityLedgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuantityLedgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
