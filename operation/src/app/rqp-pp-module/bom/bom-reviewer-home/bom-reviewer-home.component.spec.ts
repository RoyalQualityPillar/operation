import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BomReviewerHomeComponent } from './bom-reviewer-home.component';

describe('BomReviewerHomeComponent', () => {
  let component: BomReviewerHomeComponent;
  let fixture: ComponentFixture<BomReviewerHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BomReviewerHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BomReviewerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
