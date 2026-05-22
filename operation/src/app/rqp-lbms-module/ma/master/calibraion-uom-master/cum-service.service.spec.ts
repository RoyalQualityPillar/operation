import { TestBed } from '@angular/core/testing';

import { CumServiceService } from './cum-service.service';

describe('CumServiceService', () => {
  let service: CumServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CumServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
