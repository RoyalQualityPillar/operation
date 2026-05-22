import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentCatCreateUpdateComponent } from './instrument-cat-create-update.component';

describe('InstrumentCatCreateUpdateComponent', () => {
  let component: InstrumentCatCreateUpdateComponent;
  let fixture: ComponentFixture<InstrumentCatCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstrumentCatCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstrumentCatCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
