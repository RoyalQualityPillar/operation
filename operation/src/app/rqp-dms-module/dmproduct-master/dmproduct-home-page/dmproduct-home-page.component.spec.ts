import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmproductHomePageComponent } from './dmproduct-home-page.component';

describe('DmproductHomePageComponent', () => {
  let component: DmproductHomePageComponent;
  let fixture: ComponentFixture<DmproductHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DmproductHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DmproductHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
