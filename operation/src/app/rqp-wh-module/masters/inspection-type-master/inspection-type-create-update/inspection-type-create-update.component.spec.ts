import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionTypeCreateUpdateComponent } from './inspection-type-create-update.component';

describe('InspectionTypeCreateUpdateComponent', () => {
  let component: InspectionTypeCreateUpdateComponent;
  let fixture: ComponentFixture<InspectionTypeCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InspectionTypeCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InspectionTypeCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
