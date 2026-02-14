import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonAllAuditTrailComponent } from './common-all-audit-trail.component';

describe('CommonAllAuditTrailComponent', () => {
  let component: CommonAllAuditTrailComponent;
  let fixture: ComponentFixture<CommonAllAuditTrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonAllAuditTrailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonAllAuditTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
