import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IwsUpdateSaveComponent } from './iws-update-save.component';

describe('IwsUpdateSaveComponent', () => {
  let component: IwsUpdateSaveComponent;
  let fixture: ComponentFixture<IwsUpdateSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IwsUpdateSaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IwsUpdateSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
