import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IwsCompletedComponent } from './iws-completed.component';

describe('IwsCompletedComponent', () => {
  let component: IwsCompletedComponent;
  let fixture: ComponentFixture<IwsCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IwsCompletedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IwsCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
