import { TestBed } from '@angular/core/testing';

import { LccpService } from './lccp.service';

describe('LccpService', () => {
  let service: LccpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LccpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
