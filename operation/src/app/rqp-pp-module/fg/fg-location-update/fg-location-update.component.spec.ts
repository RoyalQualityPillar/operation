import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FgLocationUpdateComponent } from './fg-location-update.component';

describe('FgLocationUpdateComponent', () => {
  let component: FgLocationUpdateComponent;
  let fixture: ComponentFixture<FgLocationUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FgLocationUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FgLocationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
