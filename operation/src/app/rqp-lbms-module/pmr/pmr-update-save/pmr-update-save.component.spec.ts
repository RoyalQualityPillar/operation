import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmrUpdateSaveComponent } from './pmr-update-save.component';

describe('PmrUpdateSaveComponent', () => {
  let component: PmrUpdateSaveComponent;
  let fixture: ComponentFixture<PmrUpdateSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PmrUpdateSaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmrUpdateSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
