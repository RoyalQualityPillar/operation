import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LccpComponent } from './lccp.component';

describe('LccpComponent', () => {
  let component: LccpComponent;
  let fixture: ComponentFixture<LccpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LccpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LccpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
