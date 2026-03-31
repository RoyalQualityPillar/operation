import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaModuleAdminComponent } from './ma-module-admin.component';

describe('MaModuleAdminComponent', () => {
  let component: MaModuleAdminComponent;
  let fixture: ComponentFixture<MaModuleAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaModuleAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaModuleAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
