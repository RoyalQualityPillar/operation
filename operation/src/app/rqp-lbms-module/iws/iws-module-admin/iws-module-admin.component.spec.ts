import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IwsModuleAdminComponent } from './iws-module-admin.component';

describe('IwsModuleAdminComponent', () => {
  let component: IwsModuleAdminComponent;
  let fixture: ComponentFixture<IwsModuleAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IwsModuleAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IwsModuleAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
