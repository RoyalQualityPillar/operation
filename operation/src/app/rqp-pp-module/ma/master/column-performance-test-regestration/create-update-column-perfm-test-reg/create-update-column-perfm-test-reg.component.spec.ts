import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateColumnPerfmTestRegComponent } from './create-update-column-perfm-test-reg.component';

describe('CreateUpdateColumnPerfmTestRegComponent', () => {
  let component: CreateUpdateColumnPerfmTestRegComponent;
  let fixture: ComponentFixture<CreateUpdateColumnPerfmTestRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateUpdateColumnPerfmTestRegComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateColumnPerfmTestRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
