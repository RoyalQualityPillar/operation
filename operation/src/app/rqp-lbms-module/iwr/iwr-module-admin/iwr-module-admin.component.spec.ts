import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IwrModuleAdminComponent } from './iwr-module-admin.component';

describe('IwrModuleAdminComponent', () => {
  let component: IwrModuleAdminComponent;
  let fixture: ComponentFixture<IwrModuleAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IwrModuleAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IwrModuleAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
