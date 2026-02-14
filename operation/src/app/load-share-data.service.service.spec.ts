import { TestBed } from '@angular/core/testing';

import { LoadShareDataServiceService } from './load-share-data.service.service';

describe('LoadShareDataServiceService', () => {
  let service: LoadShareDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadShareDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
