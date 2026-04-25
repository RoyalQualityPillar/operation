import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarantinePackDisplayComponent } from './quarantine-pack-display.component';

describe('QuarantinePackDisplayComponent', () => {
  let component: QuarantinePackDisplayComponent;
  let fixture: ComponentFixture<QuarantinePackDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuarantinePackDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuarantinePackDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
