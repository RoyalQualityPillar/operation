import { TestBed } from '@angular/core/testing';

import { LifeCycleDataService } from './life-cycle-data.service';

describe('LifeCycleDataService', () => {
  let service: LifeCycleDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LifeCycleDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
