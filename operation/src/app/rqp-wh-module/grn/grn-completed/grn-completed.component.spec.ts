import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrnCompletedComponent } from './grn-completed.component';

describe('GrnCompletedComponent', () => {
  let component: GrnCompletedComponent;
  let fixture: ComponentFixture<GrnCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GrnCompletedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrnCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
