import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrnUpdateComponent } from './grn-update.component';

describe('GrnUpdateComponent', () => {
  let component: GrnUpdateComponent;
  let fixture: ComponentFixture<GrnUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GrnUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrnUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
