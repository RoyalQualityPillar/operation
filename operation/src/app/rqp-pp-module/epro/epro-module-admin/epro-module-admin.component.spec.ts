import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EproModuleAdminComponent } from './epro-module-admin.component';

describe('EproModuleAdminComponent', () => {
  let component: EproModuleAdminComponent;
  let fixture: ComponentFixture<EproModuleAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EproModuleAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EproModuleAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
