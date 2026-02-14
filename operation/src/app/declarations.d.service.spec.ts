import { TestBed } from '@angular/core/testing';

import { DeclarationsDService } from './declarations.d.service';

describe('DeclarationsDService', () => {
  let service: DeclarationsDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeclarationsDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
