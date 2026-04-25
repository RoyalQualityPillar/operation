import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialRequVerfComponent } from './material-requ-verf.component';

describe('MaterialRequVerfComponent', () => {
  let component: MaterialRequVerfComponent;
  let fixture: ComponentFixture<MaterialRequVerfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaterialRequVerfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialRequVerfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
