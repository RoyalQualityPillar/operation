import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubModuleListComponent } from './sub-module-list.component';

describe('SubModuleListComponent', () => {
  let component: SubModuleListComponent;
  let fixture: ComponentFixture<SubModuleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubModuleListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubModuleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
