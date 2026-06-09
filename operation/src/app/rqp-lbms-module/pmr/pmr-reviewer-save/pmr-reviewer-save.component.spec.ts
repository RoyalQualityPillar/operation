import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmrReviewerSaveComponent } from './pmr-reviewer-save.component';

describe('PmrReviewerSaveComponent', () => {
  let component: PmrReviewerSaveComponent;
  let fixture: ComponentFixture<PmrReviewerSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PmrReviewerSaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmrReviewerSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
