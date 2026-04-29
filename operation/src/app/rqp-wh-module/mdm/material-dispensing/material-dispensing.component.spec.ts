import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialDispensingComponent } from './material-dispensing.component';

describe('MaterialDispensingComponent', () => {
  let component: MaterialDispensingComponent;
  let fixture: ComponentFixture<MaterialDispensingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaterialDispensingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialDispensingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
