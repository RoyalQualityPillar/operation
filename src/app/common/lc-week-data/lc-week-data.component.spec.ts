import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LcWeekDataComponent } from './lc-week-data.component';

describe('LcWeekDataComponent', () => {
  let component: LcWeekDataComponent;
  let fixture: ComponentFixture<LcWeekDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LcWeekDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LcWeekDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
