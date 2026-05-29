import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IwrCompletedComponent } from './iwr-completed.component';

describe('IwrCompletedComponent', () => {
  let component: IwrCompletedComponent;
  let fixture: ComponentFixture<IwrCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IwrCompletedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IwrCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
