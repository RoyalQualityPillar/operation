import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaGroupMasterCreateUpdateComponent } from './area-group-master-create-update.component';

describe('AreaGroupMasterCreateUpdateComponent', () => {
  let component: AreaGroupMasterCreateUpdateComponent;
  let fixture: ComponentFixture<AreaGroupMasterCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AreaGroupMasterCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaGroupMasterCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
