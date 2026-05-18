import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfgSamplingListComponent } from './sfg-sampling-list.component';

describe('SfgSamplingListComponent', () => {
  let component: SfgSamplingListComponent;
  let fixture: ComponentFixture<SfgSamplingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SfgSamplingListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SfgSamplingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
