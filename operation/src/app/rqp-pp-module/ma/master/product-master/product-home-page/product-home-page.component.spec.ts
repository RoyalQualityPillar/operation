import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductHomePageComponent } from './product-home-page.component';

describe('ProductHomePageComponent', () => {
  let component: ProductHomePageComponent;
  let fixture: ComponentFixture<ProductHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
