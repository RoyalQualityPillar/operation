import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BomCompletedComponent } from './bom-completed.component';

describe('BomCompletedComponent', () => {
  let component: BomCompletedComponent;
  let fixture: ComponentFixture<BomCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BomCompletedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BomCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
