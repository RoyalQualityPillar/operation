import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentCatHomePageComponent } from './instrument-cat-home-page.component';

describe('InstrumentCatHomePageComponent', () => {
  let component: InstrumentCatHomePageComponent;
  let fixture: ComponentFixture<InstrumentCatHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstrumentCatHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstrumentCatHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
