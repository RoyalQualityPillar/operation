import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfgQuarantineListComponent } from './sfg-quarantine-list.component';

describe('SfgQuarantineListComponent', () => {
  let component: SfgQuarantineListComponent;
  let fixture: ComponentFixture<SfgQuarantineListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SfgQuarantineListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SfgQuarantineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
