import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpmCreateUpdateComponent } from './cpm-create-update.component';

describe('CpmCreateUpdateComponent', () => {
  let component: CpmCreateUpdateComponent;
  let fixture: ComponentFixture<CpmCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CpmCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CpmCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
