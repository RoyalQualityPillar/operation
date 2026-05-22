import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QmModuleAdminComponent } from './qm-module-admin.component';

describe('QmModuleAdminComponent', () => {
  let component: QmModuleAdminComponent;
  let fixture: ComponentFixture<QmModuleAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QmModuleAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QmModuleAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
