import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FgExecutionProcessOrderComponent } from './fg-execution-process-order.component';

describe('FgExecutionProcessOrderComponent', () => {
  let component: FgExecutionProcessOrderComponent;
  let fixture: ComponentFixture<FgExecutionProcessOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FgExecutionProcessOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FgExecutionProcessOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
