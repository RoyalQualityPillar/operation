import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FgSamplingListComponent } from './fg-sampling-list.component';

describe('FgSamplingListComponent', () => {
  let component: FgSamplingListComponent;
  let fixture: ComponentFixture<FgSamplingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FgSamplingListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FgSamplingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
