import { TestBed } from '@angular/core/testing';

import { IwsService } from './iws.service';

describe('IwsService', () => {
  let service: IwsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IwsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
