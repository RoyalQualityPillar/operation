import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlListComponent } from './sl-list.component';

describe('SlListComponent', () => {
  let component: SlListComponent;
  let fixture: ComponentFixture<SlListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SlListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
