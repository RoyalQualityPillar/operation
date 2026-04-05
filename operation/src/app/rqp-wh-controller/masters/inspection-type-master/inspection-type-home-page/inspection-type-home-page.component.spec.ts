import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionTypeHomePageComponent } from './inspection-type-home-page.component';

describe('InspectionTypeHomePageComponent', () => {
  let component: InspectionTypeHomePageComponent;
  let fixture: ComponentFixture<InspectionTypeHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InspectionTypeHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InspectionTypeHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
