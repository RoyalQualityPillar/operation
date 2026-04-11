import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanRoomGradeHomePageComponent } from './clean-room-grade-home-page.component';

describe('CleanRoomGradeHomePageComponent', () => {
  let component: CleanRoomGradeHomePageComponent;
  let fixture: ComponentFixture<CleanRoomGradeHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CleanRoomGradeHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CleanRoomGradeHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
