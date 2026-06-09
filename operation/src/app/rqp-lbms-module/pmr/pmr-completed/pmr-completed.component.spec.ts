import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmrCompletedComponent } from './pmr-completed.component';

describe('PmrCompletedComponent', () => {
  let component: PmrCompletedComponent;
  let fixture: ComponentFixture<PmrCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PmrCompletedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmrCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
