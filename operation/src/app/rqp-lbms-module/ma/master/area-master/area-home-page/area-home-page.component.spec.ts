import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaHomePageComponent } from './area-home-page.component';

describe('AreaHomePageComponent', () => {
  let component: AreaHomePageComponent;
  let fixture: ComponentFixture<AreaHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AreaHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
