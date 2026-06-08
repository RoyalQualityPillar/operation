import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IwrUpdateComponent } from './iwr-update.component';

describe('IwrUpdateComponent', () => {
  let component: IwrUpdateComponent;
  let fixture: ComponentFixture<IwrUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IwrUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IwrUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
