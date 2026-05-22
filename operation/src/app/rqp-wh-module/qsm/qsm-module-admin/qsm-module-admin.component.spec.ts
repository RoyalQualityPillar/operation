import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QsmModuleAdminComponent } from './qsm-module-admin.component';

describe('QsmModuleAdminComponent', () => {
  let component: QsmModuleAdminComponent;
  let fixture: ComponentFixture<QsmModuleAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QsmModuleAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QsmModuleAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
