import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmrCompletedSaveComponent } from './pmr-completed-save.component';

describe('PmrCompletedSaveComponent', () => {
  let component: PmrCompletedSaveComponent;
  let fixture: ComponentFixture<PmrCompletedSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PmrCompletedSaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmrCompletedSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
