import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderSamplingListHomePageComponent } from './under-sampling-list-home-page.component';

describe('UnderSamplingListHomePageComponent', () => {
  let component: UnderSamplingListHomePageComponent;
  let fixture: ComponentFixture<UnderSamplingListHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnderSamplingListHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnderSamplingListHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
