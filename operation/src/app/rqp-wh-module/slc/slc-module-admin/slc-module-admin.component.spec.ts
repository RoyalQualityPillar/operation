import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlcModuleAdminComponent } from './slc-module-admin.component';

describe('SlcModuleAdminComponent', () => {
  let component: SlcModuleAdminComponent;
  let fixture: ComponentFixture<SlcModuleAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SlcModuleAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlcModuleAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
