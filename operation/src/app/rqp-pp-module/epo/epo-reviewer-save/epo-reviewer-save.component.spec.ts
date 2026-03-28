import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpoReviewerSaveComponent } from './epo-reviewer-save.component';

describe('EpoReviewerSaveComponent', () => {
  let component: EpoReviewerSaveComponent;
  let fixture: ComponentFixture<EpoReviewerSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EpoReviewerSaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpoReviewerSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
