import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialRequPlanningComponent } from './material-requ-planning.component';

describe('MaterialRequPlanningComponent', () => {
  let component: MaterialRequPlanningComponent;
  let fixture: ComponentFixture<MaterialRequPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaterialRequPlanningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialRequPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
