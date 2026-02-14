import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewerTemplateComponent } from './reviewer-template.component';

describe('ReviewerTemplateComponent', () => {
  let component: ReviewerTemplateComponent;
  let fixture: ComponentFixture<ReviewerTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewerTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewerTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
