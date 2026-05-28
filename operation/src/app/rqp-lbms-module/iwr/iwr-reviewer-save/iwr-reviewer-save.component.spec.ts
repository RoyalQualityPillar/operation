import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IwrReviewerSaveComponent } from './iwr-reviewer-save.component';

describe('IwrReviewerSaveComponent', () => {
  let component: IwrReviewerSaveComponent;
  let fixture: ComponentFixture<IwrReviewerSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IwrReviewerSaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IwrReviewerSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
