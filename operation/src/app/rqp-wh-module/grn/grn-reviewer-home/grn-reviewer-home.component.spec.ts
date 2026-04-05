import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrnReviewerHomeComponent } from './grn-reviewer-home.component';

describe('GrnReviewerHomeComponent', () => {
  let component: GrnReviewerHomeComponent;
  let fixture: ComponentFixture<GrnReviewerHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GrnReviewerHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrnReviewerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
