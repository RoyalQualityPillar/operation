import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityHomePageComponent } from './quantity-home-page.component';

describe('QuantityHomePageComponent', () => {
  let component: QuantityHomePageComponent;
  let fixture: ComponentFixture<QuantityHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuantityHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuantityHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
