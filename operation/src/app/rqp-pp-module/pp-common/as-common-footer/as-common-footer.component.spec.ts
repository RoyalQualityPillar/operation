import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsCommonFooterComponent } from './as-common-footer.component';

describe('AsCommonFooterComponent', () => {
  let component: AsCommonFooterComponent;
  let fixture: ComponentFixture<AsCommonFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsCommonFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsCommonFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
