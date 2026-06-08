import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmcModuleAdminComponent } from './pmc-module-admin.component';

describe('PmcModuleAdminComponent', () => {
  let component: PmcModuleAdminComponent;
  let fixture: ComponentFixture<PmcModuleAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PmcModuleAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmcModuleAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
