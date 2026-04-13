import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BomInitiatorComponent } from './bom-initiator.component';

describe('BomInitiatorComponent', () => {
  let component: BomInitiatorComponent;
  let fixture: ComponentFixture<BomInitiatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BomInitiatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BomInitiatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
