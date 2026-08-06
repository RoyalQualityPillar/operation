import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmproductCreateUpdateComponent } from './dmproduct-create-update.component';

describe('DmproductCreateUpdateComponent', () => {
  let component: DmproductCreateUpdateComponent;
  let fixture: ComponentFixture<DmproductCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DmproductCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DmproductCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
