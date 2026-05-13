import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateEquipmentMasterComponent } from './create-update-equipment-master.component';

describe('CreateUpdateEquipmentMasterComponent', () => {
  let component: CreateUpdateEquipmentMasterComponent;
  let fixture: ComponentFixture<CreateUpdateEquipmentMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateUpdateEquipmentMasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateEquipmentMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
