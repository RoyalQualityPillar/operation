import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpoInitiatorComponent } from './epo-initiator.component';

describe('EpoInitiatorComponent', () => {
  let component: EpoInitiatorComponent;
  let fixture: ComponentFixture<EpoInitiatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EpoInitiatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpoInitiatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
