import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateEquipInstMasterComponent } from './create-update-equip-inst-master.component';

describe('CreateUpdateEquipInstMasterComponent', () => {
  let component: CreateUpdateEquipInstMasterComponent;
  let fixture: ComponentFixture<CreateUpdateEquipInstMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateUpdateEquipInstMasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateEquipInstMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
