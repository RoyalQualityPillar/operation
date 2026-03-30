import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockListEpoComponent } from './stock-list-epo.component';

describe('StockListEpoComponent', () => {
  let component: StockListEpoComponent;
  let fixture: ComponentFixture<StockListEpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockListEpoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockListEpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
