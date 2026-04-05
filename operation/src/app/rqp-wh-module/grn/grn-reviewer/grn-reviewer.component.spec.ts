import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrnReviewerComponent } from './grn-reviewer.component';

describe('GrnReviewerComponent', () => {
  let component: GrnReviewerComponent;
  let fixture: ComponentFixture<GrnReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GrnReviewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrnReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
