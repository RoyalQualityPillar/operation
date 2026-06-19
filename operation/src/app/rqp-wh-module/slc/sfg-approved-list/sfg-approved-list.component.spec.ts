import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfgApprovedListComponent } from './sfg-approved-list.component';

describe('SfgApprovedListComponent', () => {
  let component: SfgApprovedListComponent;
  let fixture: ComponentFixture<SfgApprovedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SfgApprovedListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SfgApprovedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
