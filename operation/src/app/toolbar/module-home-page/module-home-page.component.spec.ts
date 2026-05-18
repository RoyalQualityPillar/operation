import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleHomePageComponent } from './module-home-page.component';

describe('ModuleHomePageComponent', () => {
  let component: ModuleHomePageComponent;
  let fixture: ComponentFixture<ModuleHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
