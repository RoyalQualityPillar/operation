import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfgApproverListComponent } from './sfg-approver-list.component';

describe('SfgApproverListComponent', () => {
  let component: SfgApproverListComponent;
  let fixture: ComponentFixture<SfgApproverListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SfgApproverListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SfgApproverListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
