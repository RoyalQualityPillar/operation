import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderTestingListComponent } from './under-testing-list.component';

describe('UnderTestingListComponent', () => {
  let component: UnderTestingListComponent;
  let fixture: ComponentFixture<UnderTestingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnderTestingListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnderTestingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
