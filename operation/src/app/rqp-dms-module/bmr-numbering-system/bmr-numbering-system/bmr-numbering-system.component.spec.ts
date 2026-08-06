import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmrNumberingSystemComponent } from './bmr-numbering-system.component';

describe('BmrNumberingSystemComponent', () => {
  let component: BmrNumberingSystemComponent;
  let fixture: ComponentFixture<BmrNumberingSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmrNumberingSystemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BmrNumberingSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
