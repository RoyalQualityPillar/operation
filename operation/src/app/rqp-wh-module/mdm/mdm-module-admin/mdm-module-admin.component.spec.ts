import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdmModuleAdminComponent } from './mdm-module-admin.component';

describe('MdmModuleAdminComponent', () => {
  let component: MdmModuleAdminComponent;
  let fixture: ComponentFixture<MdmModuleAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MdmModuleAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MdmModuleAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
