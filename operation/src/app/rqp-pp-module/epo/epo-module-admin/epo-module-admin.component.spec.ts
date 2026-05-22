import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpoModuleAdminComponent } from './epo-module-admin.component';

describe('EpoModuleAdminComponent', () => {
  let component: EpoModuleAdminComponent;
  let fixture: ComponentFixture<EpoModuleAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EpoModuleAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpoModuleAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
