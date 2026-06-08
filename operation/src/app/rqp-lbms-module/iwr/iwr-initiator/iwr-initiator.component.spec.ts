import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IwrInitiatorComponent } from './iwr-initiator.component';

describe('IwrInitiatorComponent', () => {
  let component: IwrInitiatorComponent;
  let fixture: ComponentFixture<IwrInitiatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IwrInitiatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IwrInitiatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
