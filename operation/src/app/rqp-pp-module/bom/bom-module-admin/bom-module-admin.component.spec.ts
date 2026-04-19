import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BomModuleAdminComponent } from './bom-module-admin.component';

describe('BomModuleAdminComponent', () => {
  let component: BomModuleAdminComponent;
  let fixture: ComponentFixture<BomModuleAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BomModuleAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BomModuleAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
