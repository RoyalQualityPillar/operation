import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmrModuleAdminComponent } from './pmr-module-admin.component';

describe('PmrModuleAdminComponent', () => {
  let component: PmrModuleAdminComponent;
  let fixture: ComponentFixture<PmrModuleAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PmrModuleAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmrModuleAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
