import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpoHomeComponent } from './epo-home.component';

describe('EpoHomeComponent', () => {
  let component: EpoHomeComponent;
  let fixture: ComponentFixture<EpoHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EpoHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
