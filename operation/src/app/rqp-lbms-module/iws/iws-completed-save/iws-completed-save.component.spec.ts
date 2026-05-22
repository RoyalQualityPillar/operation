import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IwsCompletedSaveComponent } from './iws-completed-save.component';

describe('IwsCompletedSaveComponent', () => {
  let component: IwsCompletedSaveComponent;
  let fixture: ComponentFixture<IwsCompletedSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IwsCompletedSaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IwsCompletedSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
