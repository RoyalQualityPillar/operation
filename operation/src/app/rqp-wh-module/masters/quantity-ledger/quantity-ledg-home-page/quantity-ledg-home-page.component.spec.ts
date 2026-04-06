import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityLedgHomePageComponent } from './quantity-ledg-home-page.component';

describe('QuantityLedgHomePageComponent', () => {
  let component: QuantityLedgHomePageComponent;
  let fixture: ComponentFixture<QuantityLedgHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuantityLedgHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuantityLedgHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
