import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrpModuleAdminComponent } from './mrp-module-admin.component';

describe('MrpModuleAdminComponent', () => {
  let component: MrpModuleAdminComponent;
  let fixture: ComponentFixture<MrpModuleAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MrpModuleAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrpModuleAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
