import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfgUnderApproverListComponent } from './sfg-under-approver-list.component';

describe('SfgUnderApproverListComponent', () => {
  let component: SfgUnderApproverListComponent;
  let fixture: ComponentFixture<SfgUnderApproverListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SfgUnderApproverListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SfgUnderApproverListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
