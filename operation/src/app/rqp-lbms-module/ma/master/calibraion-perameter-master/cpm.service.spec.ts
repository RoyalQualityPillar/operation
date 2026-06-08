import { TestBed } from '@angular/core/testing';

import { CpmService } from './cpm.service';

describe('CpmService', () => {
  let service: CpmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CpmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
