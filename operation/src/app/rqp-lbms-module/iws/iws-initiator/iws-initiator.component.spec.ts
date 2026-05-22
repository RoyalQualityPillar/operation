import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IwsInitiatorComponent } from './iws-initiator.component';

describe('IwsInitiatorComponent', () => {
  let component: IwsInitiatorComponent;
  let fixture: ComponentFixture<IwsInitiatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IwsInitiatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IwsInitiatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
