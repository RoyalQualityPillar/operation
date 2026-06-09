import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmrReviewerComponent } from './pmr-reviewer.component';

describe('PmrReviewerComponent', () => {
  let component: PmrReviewerComponent;
  let fixture: ComponentFixture<PmrReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PmrReviewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmrReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
