import { TestBed } from '@angular/core/testing';

import { ColumnPerfmTestRegService } from './column-perfm-test-reg.service';

describe('ColumnPerfmTestRegService', () => {
  let service: ColumnPerfmTestRegService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColumnPerfmTestRegService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
