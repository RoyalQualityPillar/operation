import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EploModuleAdminComponent } from './eplo-module-admin.component';

describe('EploModuleAdminComponent', () => {
  let component: EploModuleAdminComponent;
  let fixture: ComponentFixture<EploModuleAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EploModuleAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EploModuleAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
