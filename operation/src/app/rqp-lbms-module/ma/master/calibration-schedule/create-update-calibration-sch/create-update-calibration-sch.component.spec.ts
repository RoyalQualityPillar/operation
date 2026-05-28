import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateCalibrationSchComponent } from './create-update-calibration-sch.component';

describe('CreateUpdateCalibrationSchComponent', () => {
  let component: CreateUpdateCalibrationSchComponent;
  let fixture: ComponentFixture<CreateUpdateCalibrationSchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateUpdateCalibrationSchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateCalibrationSchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
