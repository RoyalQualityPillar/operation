import { TestBed } from '@angular/core/testing';

import { CleanRoomGradeService } from './clean-room-grade.service';

describe('CleanRoomGradeService', () => {
  let service: CleanRoomGradeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CleanRoomGradeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
