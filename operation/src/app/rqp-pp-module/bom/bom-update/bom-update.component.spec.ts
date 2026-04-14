import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BomUpdateComponent } from './bom-update.component';

describe('BomUpdateComponent', () => {
  let component: BomUpdateComponent;
  let fixture: ComponentFixture<BomUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BomUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BomUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
