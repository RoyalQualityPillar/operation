import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningOrderListComponent } from './planning-order-list.component';

describe('PlanningOrderListComponent', () => {
  let component: PlanningOrderListComponent;
  let fixture: ComponentFixture<PlanningOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanningOrderListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanningOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
