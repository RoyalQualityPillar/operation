import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrnCompletedSaveComponent } from './grn-completed-save.component';

describe('GrnCompletedSaveComponent', () => {
  let component: GrnCompletedSaveComponent;
  let fixture: ComponentFixture<GrnCompletedSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GrnCompletedSaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrnCompletedSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
