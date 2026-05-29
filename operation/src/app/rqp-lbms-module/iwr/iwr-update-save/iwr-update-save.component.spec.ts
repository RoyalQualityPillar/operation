import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IwrUpdateSaveComponent } from './iwr-update-save.component';

describe('IwrUpdateSaveComponent', () => {
  let component: IwrUpdateSaveComponent;
  let fixture: ComponentFixture<IwrUpdateSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IwrUpdateSaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IwrUpdateSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
