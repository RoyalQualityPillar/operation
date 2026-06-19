import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfgRejectListComponent } from './sfg-reject-list.component';

describe('SfgRejectListComponent', () => {
  let component: SfgRejectListComponent;
  let fixture: ComponentFixture<SfgRejectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SfgRejectListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SfgRejectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
