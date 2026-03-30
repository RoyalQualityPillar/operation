import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmsListComponent } from './pms-list.component';

describe('PmsListComponent', () => {
  let component: PmsListComponent;
  let fixture: ComponentFixture<PmsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PmsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
