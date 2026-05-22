import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialReservedListComponent } from './material-reserved-list.component';

describe('MaterialReservedListComponent', () => {
  let component: MaterialReservedListComponent;
  let fixture: ComponentFixture<MaterialReservedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaterialReservedListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialReservedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
