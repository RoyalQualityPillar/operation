import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrnInitiatorComponent } from './grn-initiator.component';

describe('GrnInitiatorComponent', () => {
  let component: GrnInitiatorComponent;
  let fixture: ComponentFixture<GrnInitiatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GrnInitiatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrnInitiatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
