import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpoUpdateComponent } from './epo-update.component';

describe('EpoUpdateComponent', () => {
  let component: EpoUpdateComponent;
  let fixture: ComponentFixture<EpoUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EpoUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
