import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IwsReviewerSaveComponent } from './iws-reviewer-save.component';

describe('IwsReviewerSaveComponent', () => {
  let component: IwsReviewerSaveComponent;
  let fixture: ComponentFixture<IwsReviewerSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IwsReviewerSaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IwsReviewerSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
