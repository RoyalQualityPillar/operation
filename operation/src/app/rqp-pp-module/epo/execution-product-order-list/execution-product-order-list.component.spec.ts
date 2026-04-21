import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutionProductOrderListComponent } from './execution-product-order-list.component';

describe('ExecutionProductOrderListComponent', () => {
  let component: ExecutionProductOrderListComponent;
  let fixture: ComponentFixture<ExecutionProductOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExecutionProductOrderListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecutionProductOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
