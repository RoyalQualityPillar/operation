import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityCreateUpdateComponent } from './quantity-create-update.component';

describe('QuantityCreateUpdateComponent', () => {
  let component: QuantityCreateUpdateComponent;
  let fixture: ComponentFixture<QuantityCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuantityCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuantityCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
