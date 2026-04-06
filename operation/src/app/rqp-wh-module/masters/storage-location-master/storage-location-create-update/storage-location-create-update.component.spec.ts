import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageLocationCreateUpdateComponent } from './storage-location-create-update.component';

describe('StorageLocationCreateUpdateComponent', () => {
  let component: StorageLocationCreateUpdateComponent;
  let fixture: ComponentFixture<StorageLocationCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StorageLocationCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorageLocationCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
