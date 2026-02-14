import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonCommentsComponent } from './common-comments.component';

describe('HeaderFooterComponent', () => {
  let component: CommonCommentsComponent;
  let fixture: ComponentFixture<CommonCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonCommentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
