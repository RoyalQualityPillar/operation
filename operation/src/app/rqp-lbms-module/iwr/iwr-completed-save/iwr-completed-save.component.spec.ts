import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IwrCompletedSaveComponent } from './iwr-completed-save.component';

describe('IwrCompletedSaveComponent', () => {
  let component: IwrCompletedSaveComponent;
  let fixture: ComponentFixture<IwrCompletedSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IwrCompletedSaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IwrCompletedSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
