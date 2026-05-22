import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialReservedPackListComponent } from './material-reserved-pack-list.component';

describe('MaterialReservedPackListComponent', () => {
  let component: MaterialReservedPackListComponent;
  let fixture: ComponentFixture<MaterialReservedPackListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaterialReservedPackListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialReservedPackListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
