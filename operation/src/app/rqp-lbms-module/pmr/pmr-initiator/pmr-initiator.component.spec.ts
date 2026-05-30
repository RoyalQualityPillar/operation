import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmrInitiatorComponent } from './pmr-initiator.component';

describe('PmrInitiatorComponent', () => {
  let component: PmrInitiatorComponent;
  let fixture: ComponentFixture<PmrInitiatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PmrInitiatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmrInitiatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
