import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmcCompletedComponent } from './pmc-completed.component';

describe('PmcCompletedComponent', () => {
  let component: PmcCompletedComponent;
  let fixture: ComponentFixture<PmcCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PmcCompletedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmcCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
