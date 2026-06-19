import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfgLocationUpdateComponent } from './sfg-location-update.component';

describe('SfgLocationUpdateComponent', () => {
  let component: SfgLocationUpdateComponent;
  let fixture: ComponentFixture<SfgLocationUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SfgLocationUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SfgLocationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
