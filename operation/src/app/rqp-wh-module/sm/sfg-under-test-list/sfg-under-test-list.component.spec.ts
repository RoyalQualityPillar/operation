import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfgUnderTestListComponent } from './sfg-under-test-list.component';

describe('SfgUnderTestListComponent', () => {
  let component: SfgUnderTestListComponent;
  let fixture: ComponentFixture<SfgUnderTestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SfgUnderTestListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SfgUnderTestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
