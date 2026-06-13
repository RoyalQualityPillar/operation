import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfgExecutionProcessOrderComponent } from './sfg-execution-process-order.component';

describe('SfgExecutionProcessOrderComponent', () => {
  let component: SfgExecutionProcessOrderComponent;
  let fixture: ComponentFixture<SfgExecutionProcessOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SfgExecutionProcessOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SfgExecutionProcessOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
