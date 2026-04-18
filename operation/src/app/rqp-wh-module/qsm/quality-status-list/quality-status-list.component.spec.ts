import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityStatusListComponent } from './quality-status-list.component';

describe('QualityStatusListComponent', () => {
  let component: QualityStatusListComponent;
  let fixture: ComponentFixture<QualityStatusListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QualityStatusListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualityStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
