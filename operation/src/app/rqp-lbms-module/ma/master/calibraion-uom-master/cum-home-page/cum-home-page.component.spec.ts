import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CumHomePageComponent } from './cum-home-page.component';

describe('CumHomePageComponent', () => {
  let component: CumHomePageComponent;
  let fixture: ComponentFixture<CumHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CumHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CumHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
