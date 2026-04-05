import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrnUpdateHomeComponent } from './grn-update-home.component';

describe('GrnUpdateHomeComponent', () => {
  let component: GrnUpdateHomeComponent;
  let fixture: ComponentFixture<GrnUpdateHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GrnUpdateHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrnUpdateHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
