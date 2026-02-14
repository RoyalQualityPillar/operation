import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonButtonBarComponent } from './common-button-bar.component';

describe('CommonButtonBarComponent', () => {
  let component: CommonButtonBarComponent;
  let fixture: ComponentFixture<CommonButtonBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonButtonBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonButtonBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
