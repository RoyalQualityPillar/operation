import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FgUnderTestListComponent } from './fg-under-test-list.component';

describe('FgUnderTestListComponent', () => {
  let component: FgUnderTestListComponent;
  let fixture: ComponentFixture<FgUnderTestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FgUnderTestListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FgUnderTestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
