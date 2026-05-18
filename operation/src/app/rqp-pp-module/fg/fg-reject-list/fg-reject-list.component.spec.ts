import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FgRejectListComponent } from './fg-reject-list.component';

describe('FgRejectListComponent', () => {
  let component: FgRejectListComponent;
  let fixture: ComponentFixture<FgRejectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FgRejectListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FgRejectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
