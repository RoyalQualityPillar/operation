import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IwsReviewerComponent } from './iws-reviewer.component';

describe('IwsReviewerComponent', () => {
  let component: IwsReviewerComponent;
  let fixture: ComponentFixture<IwsReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IwsReviewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IwsReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
