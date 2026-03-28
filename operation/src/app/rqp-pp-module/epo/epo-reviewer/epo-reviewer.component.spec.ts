import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpoReviewerComponent } from './epo-reviewer.component';

describe('EpoReviewerComponent', () => {
  let component: EpoReviewerComponent;
  let fixture: ComponentFixture<EpoReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EpoReviewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpoReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
