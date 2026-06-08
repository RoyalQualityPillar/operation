import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmcInitiatorComponent } from './pmc-initiator.component';

describe('PmcInitiatorComponent', () => {
  let component: PmcInitiatorComponent;
  let fixture: ComponentFixture<PmcInitiatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PmcInitiatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmcInitiatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
