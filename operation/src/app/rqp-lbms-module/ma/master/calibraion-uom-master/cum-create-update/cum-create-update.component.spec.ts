import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CumCreateUpdateComponent } from './cum-create-update.component';

describe('CumCreateUpdateComponent', () => {
  let component: CumCreateUpdateComponent;
  let fixture: ComponentFixture<CumCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CumCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CumCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
