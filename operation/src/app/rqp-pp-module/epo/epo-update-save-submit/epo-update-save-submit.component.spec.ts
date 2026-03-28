import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpoUpdateSaveSubmitComponent } from './epo-update-save-submit.component';

describe('EpoUpdateSaveSubmitComponent', () => {
  let component: EpoUpdateSaveSubmitComponent;
  let fixture: ComponentFixture<EpoUpdateSaveSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EpoUpdateSaveSubmitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpoUpdateSaveSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
