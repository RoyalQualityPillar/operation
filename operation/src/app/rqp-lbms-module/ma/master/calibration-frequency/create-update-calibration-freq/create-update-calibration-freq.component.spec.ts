import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateCalibrationFreqComponent } from './create-update-calibration-freq.component';

describe('CreateUpdateCalibrationFreqComponent', () => {
  let component: CreateUpdateCalibrationFreqComponent;
  let fixture: ComponentFixture<CreateUpdateCalibrationFreqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateUpdateCalibrationFreqComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateCalibrationFreqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
