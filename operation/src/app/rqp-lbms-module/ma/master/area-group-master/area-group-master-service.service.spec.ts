import { TestBed } from '@angular/core/testing';

import { AreaGroupMasterServiceService } from './area-group-master-service.service';

describe('AreaGroupMasterServiceService', () => {
  let service: AreaGroupMasterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AreaGroupMasterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
