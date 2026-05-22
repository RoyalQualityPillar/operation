import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmModuleAdminComponent } from './sm-module-admin.component';

describe('SmModuleAdminComponent', () => {
  let component: SmModuleAdminComponent;
  let fixture: ComponentFixture<SmModuleAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmModuleAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmModuleAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
