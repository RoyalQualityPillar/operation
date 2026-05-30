import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmcHomeComponent } from './pmc-home.component';

describe('PmcHomeComponent', () => {
  let component: PmcHomeComponent;
  let fixture: ComponentFixture<PmcHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PmcHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmcHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
