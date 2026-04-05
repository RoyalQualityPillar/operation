import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageLocationHomePageComponent } from './storage-location-home-page.component';

describe('StorageLocationHomePageComponent', () => {
  let component: StorageLocationHomePageComponent;
  let fixture: ComponentFixture<StorageLocationHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StorageLocationHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorageLocationHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
