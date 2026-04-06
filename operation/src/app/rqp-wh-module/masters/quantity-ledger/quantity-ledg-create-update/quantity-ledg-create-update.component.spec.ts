import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityLedgCreateUpdateComponent } from './quantity-ledg-create-update.component';

describe('QuantityLedgCreateUpdateComponent', () => {
  let component: QuantityLedgCreateUpdateComponent;
  let fixture: ComponentFixture<QuantityLedgCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuantityLedgCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuantityLedgCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
