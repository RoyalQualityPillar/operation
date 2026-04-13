import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BomUpdateHomeComponent } from './bom-update-home.component';

describe('BomUpdateHomeComponent', () => {
  let component: BomUpdateHomeComponent;
  let fixture: ComponentFixture<BomUpdateHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BomUpdateHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BomUpdateHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
