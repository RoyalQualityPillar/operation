import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmcUpdateComponent } from './pmc-update.component';

describe('PmcUpdateComponent', () => {
  let component: PmcUpdateComponent;
  let fixture: ComponentFixture<PmcUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PmcUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmcUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
