import { TestBed } from '@angular/core/testing';

import { IwrService } from './iwr.service';

describe('IwrService', () => {
  let service: IwrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IwrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
