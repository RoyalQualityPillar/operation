import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaCreateUpdateComponent } from './area-create-update.component';

describe('AreaCreateUpdateComponent', () => {
  let component: AreaCreateUpdateComponent;
  let fixture: ComponentFixture<AreaCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AreaCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
