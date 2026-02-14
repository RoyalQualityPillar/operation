import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonActiveAuditTrailComponent } from './common-active-audit-trail.component';

describe('CommonActiveAuditTrailComponent', () => {
  let component: CommonActiveAuditTrailComponent;
  let fixture: ComponentFixture<CommonActiveAuditTrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonActiveAuditTrailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonActiveAuditTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
