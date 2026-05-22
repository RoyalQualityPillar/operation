import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FgQuarantineListComponent } from './fg-quarantine-list.component';

describe('FgQuarantineListComponent', () => {
  let component: FgQuarantineListComponent;
  let fixture: ComponentFixture<FgQuarantineListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FgQuarantineListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FgQuarantineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
