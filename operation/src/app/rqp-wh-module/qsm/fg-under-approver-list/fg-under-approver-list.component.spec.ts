import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FgUnderApproverListComponent } from './fg-under-approver-list.component';

describe('FgUnderApproverListComponent', () => {
  let component: FgUnderApproverListComponent;
  let fixture: ComponentFixture<FgUnderApproverListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FgUnderApproverListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FgUnderApproverListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
