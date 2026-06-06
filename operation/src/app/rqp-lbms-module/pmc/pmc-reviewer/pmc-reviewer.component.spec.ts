import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmcReviewerComponent } from './pmc-reviewer.component';

describe('PmcReviewerComponent', () => {
  let component: PmcReviewerComponent;
  let fixture: ComponentFixture<PmcReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PmcReviewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmcReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
