import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionCompletedListComponent } from './production-completed-list.component';

describe('ProductionCompletedListComponent', () => {
  let component: ProductionCompletedListComponent;
  let fixture: ComponentFixture<ProductionCompletedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductionCompletedListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionCompletedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
