import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmsAddNewRecordComponent } from './dms-add-new-record.component';

describe('DmsAddNewRecordComponent', () => {
  let component: DmsAddNewRecordComponent;
  let fixture: ComponentFixture<DmsAddNewRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DmsAddNewRecordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DmsAddNewRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
