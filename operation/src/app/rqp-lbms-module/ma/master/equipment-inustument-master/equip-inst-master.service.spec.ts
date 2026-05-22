import { TestBed } from '@angular/core/testing';

import { EquipInstMasterService } from './equip-inst-master.service';

describe('EquipInstMasterService', () => {
  let service: EquipInstMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipInstMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
