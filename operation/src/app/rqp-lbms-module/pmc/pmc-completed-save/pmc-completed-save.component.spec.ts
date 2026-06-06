import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmcCompletedSaveComponent } from './pmc-completed-save.component';

describe('PmcCompletedSaveComponent', () => {
  let component: PmcCompletedSaveComponent;
  let fixture: ComponentFixture<PmcCompletedSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PmcCompletedSaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmcCompletedSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
