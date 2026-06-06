import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmcUpdateSaveComponent } from './pmc-update-save.component';

describe('PmcUpdateSaveComponent', () => {
  let component: PmcUpdateSaveComponent;
  let fixture: ComponentFixture<PmcUpdateSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PmcUpdateSaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmcUpdateSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
