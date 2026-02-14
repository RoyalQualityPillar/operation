import { TestBed } from '@angular/core/testing';

import { LoadShareDataService } from './load-share-data.service';

describe('LoadShareDataService', () => {
  let service: LoadShareDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadShareDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
