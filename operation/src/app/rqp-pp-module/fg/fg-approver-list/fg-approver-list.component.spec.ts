import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FgApproverListComponent } from './fg-approver-list.component';

describe('FgApproverListComponent', () => {
  let component: FgApproverListComponent;
  let fixture: ComponentFixture<FgApproverListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FgApproverListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FgApproverListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
