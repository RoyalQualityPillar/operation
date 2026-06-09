import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmrUpdateComponent } from './pmr-update.component';

describe('PmrUpdateComponent', () => {
  let component: PmrUpdateComponent;
  let fixture: ComponentFixture<PmrUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PmrUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmrUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
