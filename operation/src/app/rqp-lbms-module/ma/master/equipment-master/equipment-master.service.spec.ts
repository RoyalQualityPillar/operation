import { TestBed } from '@angular/core/testing';

import { EquipmentMasterService } from './equipment-master.service';

describe('EquipmentMasterService', () => {
  let service: EquipmentMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipmentMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
