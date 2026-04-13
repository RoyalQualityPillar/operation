import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BomCompletedSaveComponent } from './bom-completed-save.component';

describe('BomCompletedSaveComponent', () => {
  let component: BomCompletedSaveComponent;
  let fixture: ComponentFixture<BomCompletedSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BomCompletedSaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BomCompletedSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
