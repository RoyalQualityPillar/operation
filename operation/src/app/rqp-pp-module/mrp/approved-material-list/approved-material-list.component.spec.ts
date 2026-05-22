import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedMaterialListComponent } from './approved-material-list.component';

describe('ApprovedMaterialListComponent', () => {
  let component: ApprovedMaterialListComponent;
  let fixture: ComponentFixture<ApprovedMaterialListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApprovedMaterialListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovedMaterialListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
