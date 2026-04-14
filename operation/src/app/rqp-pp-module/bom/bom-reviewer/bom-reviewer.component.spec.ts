import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BomReviewerComponent } from './bom-reviewer.component';

describe('BomReviewerComponent', () => {
  let component: BomReviewerComponent;
  let fixture: ComponentFixture<BomReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BomReviewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BomReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
