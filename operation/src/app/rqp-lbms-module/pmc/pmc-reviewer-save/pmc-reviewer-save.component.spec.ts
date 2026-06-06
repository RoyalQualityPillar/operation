import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmcReviewerSaveComponent } from './pmc-reviewer-save.component';

describe('PmcReviewerSaveComponent', () => {
  let component: PmcReviewerSaveComponent;
  let fixture: ComponentFixture<PmcReviewerSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PmcReviewerSaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmcReviewerSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
