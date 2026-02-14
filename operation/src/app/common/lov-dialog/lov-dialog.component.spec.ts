import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LovDialogComponent } from './lov-dialog.component';

describe('LovDialogComponent', () => {
  let component: LovDialogComponent;
  let fixture: ComponentFixture<LovDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LovDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LovDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
