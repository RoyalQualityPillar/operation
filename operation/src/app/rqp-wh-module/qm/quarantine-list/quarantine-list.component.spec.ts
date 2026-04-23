import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarantineListComponent } from './quarantine-list.component';

describe('QuarantineListComponent', () => {
  let component: QuarantineListComponent;
  let fixture: ComponentFixture<QuarantineListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuarantineListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuarantineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
