import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IwrReviewerComponent } from './iwr-reviewer.component';

describe('IwrReviewerComponent', () => {
  let component: IwrReviewerComponent;
  let fixture: ComponentFixture<IwrReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IwrReviewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IwrReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
