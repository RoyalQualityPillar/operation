import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpmHomePageComponent } from './cpm-home-page.component';

describe('CpmHomePageComponent', () => {
  let component: CpmHomePageComponent;
  let fixture: ComponentFixture<CpmHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CpmHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CpmHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
