import { TestBed } from '@angular/core/testing';

import { DmproductService } from './dmproduct.service';

describe('DmproductService', () => {
  let service: DmproductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DmproductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
