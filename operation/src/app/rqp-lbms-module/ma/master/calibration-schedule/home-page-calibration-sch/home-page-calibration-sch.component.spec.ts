import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageCalibrationSchComponent } from './home-page-calibration-sch.component';

describe('HomePageCalibrationSchComponent', () => {
  let component: HomePageCalibrationSchComponent;
  let fixture: ComponentFixture<HomePageCalibrationSchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePageCalibrationSchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageCalibrationSchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
