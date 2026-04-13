import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanRoomGradeCreateUpdateComponent } from './clean-room-grade-create-update.component';

describe('CleanRoomGradeCreateUpdateComponent', () => {
  let component: CleanRoomGradeCreateUpdateComponent;
  let fixture: ComponentFixture<CleanRoomGradeCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CleanRoomGradeCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CleanRoomGradeCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
