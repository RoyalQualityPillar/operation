import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageCalibrationFreqComponent } from './home-page-calibration-freq.component';

describe('HomePageCalibrationFreqComponent', () => {
  let component: HomePageCalibrationFreqComponent;
  let fixture: ComponentFixture<HomePageCalibrationFreqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePageCalibrationFreqComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageCalibrationFreqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
