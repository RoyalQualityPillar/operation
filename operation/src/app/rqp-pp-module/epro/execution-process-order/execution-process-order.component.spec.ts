import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutionProcessOrderComponent } from './execution-process-order.component';

describe('ExecutionProcessOrderComponent', () => {
  let component: ExecutionProcessOrderComponent;
  let fixture: ComponentFixture<ExecutionProcessOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExecutionProcessOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecutionProcessOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
